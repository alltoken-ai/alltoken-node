import { buildHeaders, resolveFetch, type AllTokenConfig } from '../client';
import type {
  ChatCompletionCreateParams,
  ChatCompletion,
  ChatCompletionChunk,
} from '../types';
import { AllTokenError } from '../error';
import { AllTokenStream } from '../streaming';

export class ChatCompletions {
  private config: AllTokenConfig;
  private baseURL: string;

  constructor(config: AllTokenConfig, baseURL: string) {
    this.config = config;
    this.baseURL = baseURL;
  }

  /**
   * Create a chat completion.
   *
   * When `stream: true`, returns an `AllTokenStream` that yields `ChatCompletionChunk`s.
   * Otherwise returns the full `ChatCompletion` response.
   */
  async create(
    params: ChatCompletionCreateParams & { stream: true },
  ): Promise<AllTokenStream<ChatCompletionChunk>>;
  async create(
    params: ChatCompletionCreateParams & { stream?: false | undefined },
  ): Promise<ChatCompletion>;
  async create(
    params: ChatCompletionCreateParams & { stream?: boolean },
  ): Promise<ChatCompletion | AllTokenStream<ChatCompletionChunk>>;
  async create(
    params: ChatCompletionCreateParams & { stream?: boolean },
  ): Promise<ChatCompletion | AllTokenStream<ChatCompletionChunk>> {
    const fetchFn = resolveFetch(this.config);
    const url = this.baseURL + '/chat/completions';
    const headers = buildHeaders(this.config);

    const response = await fetchFn(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ ...params, stream: params.stream ?? false }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new AllTokenError(response.status, text);
    }

    if (params.stream) {
      return new AllTokenStream<ChatCompletionChunk>(response);
    }

    return response.json() as Promise<ChatCompletion>;
  }
}

export class Chat {
  readonly completions: ChatCompletions;

  constructor(config: AllTokenConfig, baseURL: string) {
    this.completions = new ChatCompletions(config, baseURL);
  }
}
