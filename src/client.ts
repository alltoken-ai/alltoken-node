/**
 * Shared base configuration + helpers for the OpenAI and Anthropic sub-clients.
 * Both sub-clients share the same API key and base URL; only the path suffix
 * differs (/v1 vs /anthropic).
 */

export interface AllTokenConfig {
  /** API key from alltoken.ai. Found in Settings → API Keys. */
  apiKey: string;
  /**
   * Override the API base URL. Defaults to `https://api.alltoken.ai`.
   * Each sub-client appends its own path (`/v1` for openai, `/anthropic` for anthropic).
   */
  baseURL?: string;
  /**
   * Custom fetch implementation. Defaults to `globalThis.fetch`.
   * Useful for injecting retry/proxy/logging middleware.
   */
  fetch?: typeof fetch;
  /** Extra headers sent on every request. */
  defaultHeaders?: Record<string, string>;
}

/** Default production base URL. */
export const DEFAULT_BASE_URL = 'https://api.alltoken.ai';

/** Resolve the fetch implementation, throwing if none is available. */
export function resolveFetch(config: AllTokenConfig): typeof fetch {
  const fetchFn = config.fetch ?? globalThis.fetch;
  if (!fetchFn) {
    throw new Error(
      '[@alltoken/ai] No fetch implementation found. Pass `fetch` in the config or use Node 18+.'
    );
  }
  return fetchFn;
}

/** Build the auth + default headers for every request. */
export function buildHeaders(config: AllTokenConfig): Record<string, string> {
  return {
    Authorization: `Bearer ${config.apiKey}`,
    'Content-Type': 'application/json',
    ...(config.defaultHeaders ?? {}),
  };
}

/** Join base URL + path, normalising trailing slashes. */
export function joinBaseURL(baseURL: string, path: string): string {
  return baseURL.replace(/\/$/, '') + path;
}
