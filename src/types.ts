import type { components } from './generated/chat';

export type ChatCompletionCreateParams = Omit<
  components['schemas']['ChatCompletionRequest'],
  'stream'
>;
export type ChatCompletion = components['schemas']['ChatCompletionResponse'];
export type ChatMessage = components['schemas']['ChatMessage'];
export type Choice = components['schemas']['Choice'];
export type Usage = components['schemas']['Usage'];

/** Streaming chunk (not in spec, follows OpenAI SSE format). */
export interface ChatCompletionChunk {
  id: string;
  object: 'chat.completion.chunk';
  created: number;
  model: string;
  choices: {
    index: number;
    delta: { role?: string; content?: string; tool_calls?: unknown[] };
    finish_reason: string | null;
  }[];
  usage?: Usage;
}
