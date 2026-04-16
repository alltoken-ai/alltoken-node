import createClient, { type Client } from 'openapi-fetch';
import type { paths } from './generated/anthropic';
import {
  DEFAULT_BASE_URL,
  buildHeaders,
  joinBaseURL,
  resolveFetch,
  type AllTokenConfig,
} from './client';

/** Path prefix for the Anthropic-compatible surface. */
const ANTHROPIC_PATH = '/anthropic';

/**
 * Anthropic-compatible client.
 *
 * Backed by `anthropic.yml`. Base URL: `https://api.alltoken.ai/anthropic`.
 *
 * The underlying typed fetch client is exposed as `.raw` for direct use:
 *
 * ```ts
 * const { data } = await client.anthropic.raw.POST('/messages', {
 *   body: {
 *     model: 'claude-sonnet-4',
 *     max_tokens: 1024,
 *     messages: [{ role: 'user', content: 'Hi' }],
 *   },
 * });
 * ```
 */
export class AnthropicClient {
  readonly raw: Client<paths>;

  constructor(config: AllTokenConfig) {
    const baseUrl = joinBaseURL(config.baseURL ?? DEFAULT_BASE_URL, ANTHROPIC_PATH);
    this.raw = createClient<paths>({
      baseUrl,
      headers: buildHeaders(config),
      fetch: resolveFetch(config),
    });
  }
}

export type { paths as AnthropicPaths };
