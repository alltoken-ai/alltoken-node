import createClient, { type Client } from 'openapi-fetch';
import type { paths } from './generated/chat';
import {
  DEFAULT_BASE_URL,
  buildHeaders,
  joinBaseURL,
  resolveFetch,
  type AllTokenConfig,
} from './client';
import { Chat } from './resources/chat';

/** Path prefix for the OpenAI-compatible surface. */
const OPENAI_PATH = '/v1';

/**
 * OpenAI-compatible client.
 *
 * Backed by `chat.yml`. Base URL: `https://api.alltoken.ai/v1`.
 *
 * The underlying typed fetch client is exposed as `.raw` for direct use:
 *
 * ```ts
 * const { data } = await client.openai.raw.POST('/chat/completions', {
 *   body: { model: 'gpt-4o', messages: [{ role: 'user', content: 'Hi' }] },
 * });
 * ```
 */
export class OpenAIClient {
  readonly raw: Client<paths>;
  readonly chat: Chat;

  constructor(config: AllTokenConfig) {
    const baseUrl = joinBaseURL(config.baseURL ?? DEFAULT_BASE_URL, OPENAI_PATH);
    this.raw = createClient<paths>({
      baseUrl,
      headers: buildHeaders(config),
      fetch: resolveFetch(config),
    });
    this.chat = new Chat(config, baseUrl);
  }
}

export type { paths as OpenAIPaths };
