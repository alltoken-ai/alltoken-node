/**
 * @alltoken-ai/sdk — Official TypeScript SDK for AllToken.
 * One API for OpenAI, Anthropic, and 100+ models.
 *
 * @example
 * ```ts
 * import { AllToken } from '@alltoken-ai/sdk';
 *
 * const client = new AllToken({ apiKey: process.env.ALLTOKEN_API_KEY! });
 *
 * // OpenAI-compatible surface
 * const { data } = await client.openai.raw.POST('/chat/completions', {
 *   body: { model: 'gpt-4o', messages: [{ role: 'user', content: 'Hi' }] },
 * });
 *
 * // Anthropic-compatible surface
 * const { data } = await client.anthropic.raw.POST('/messages', {
 *   body: {
 *     model: 'claude-sonnet-4',
 *     max_tokens: 1024,
 *     messages: [{ role: 'user', content: 'Hi' }],
 *   },
 * });
 * ```
 */

import { OpenAIClient } from './openai';
import { AnthropicClient } from './anthropic';
import type { AllTokenConfig } from './client';

export class AllToken {
  readonly openai: OpenAIClient;
  readonly anthropic: AnthropicClient;

  constructor(config: AllTokenConfig) {
    this.openai = new OpenAIClient(config);
    this.anthropic = new AnthropicClient(config);
  }
}

export { OpenAIClient } from './openai';
export { AnthropicClient } from './anthropic';
export { AllTokenError } from './error';
export { AllTokenStream } from './streaming';
export type { AllTokenConfig } from './client';
export type { OpenAIPaths } from './openai';
export type { AnthropicPaths } from './anthropic';
export type {
  ChatCompletionCreateParams,
  ChatCompletion,
  ChatCompletionChunk,
  ChatMessage,
  Choice,
  Usage,
} from './types';
