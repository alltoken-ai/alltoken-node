/**
 * SSE stream parser that yields typed chunks from a fetch Response.
 *
 * Reads `response.body` as a ReadableStream, parses `data: {...}` lines,
 * skips `data: [DONE]`, and JSON-parses each payload into `T`.
 */
export class AllTokenStream<T> implements AsyncIterable<T> {
  private response: Response;

  constructor(response: Response) {
    this.response = response;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    const body = this.response.body;
    if (!body) {
      throw new Error('Response body is null — cannot stream.');
    }

    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete lines (SSE lines are terminated by \n)
        const lines = buffer.split('\n');
        // Keep the last element — it may be an incomplete line
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(':')) {
            // Empty line or SSE comment — skip
            continue;
          }
          if (!trimmed.startsWith('data:')) {
            continue;
          }

          const payload = trimmed.slice('data:'.length).trim();
          if (payload === '[DONE]') {
            return;
          }

          yield JSON.parse(payload) as T;
        }
      }

      // Flush any remaining data in the buffer
      if (buffer.trim()) {
        const trimmed = buffer.trim();
        if (trimmed.startsWith('data:')) {
          const payload = trimmed.slice('data:'.length).trim();
          if (payload && payload !== '[DONE]') {
            yield JSON.parse(payload) as T;
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Convert the stream into a web-standard ReadableStream of parsed chunks.
   * Useful for piping into frameworks that accept ReadableStream (e.g. Next.js).
   */
  toReadableStream(): ReadableStream<T> {
    const iterator = this[Symbol.asyncIterator]();
    return new ReadableStream<T>({
      async pull(controller) {
        const { done, value } = await iterator.next();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      },
    });
  }
}
