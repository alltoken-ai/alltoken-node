# @alltoken/ai

Official TypeScript SDK for [AllToken](https://alltoken.ai) — one API for OpenAI, Anthropic, and 100+ models.

```bash
npm install @alltoken/ai
```

Requires **Node.js 18+** (for built-in `fetch`). Works in browsers, Deno, Bun, Cloudflare Workers.

## Quick start

```ts
import { AllToken } from '@alltoken/ai';

const client = new AllToken({ apiKey: process.env.ALLTOKEN_API_KEY! });

// OpenAI-compatible surface (maps to /v1)
const { data } = await client.openai.raw.POST('/chat/completions', {
  body: {
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'Hello!' }],
  },
});

// Anthropic-compatible surface (maps to /anthropic)
const { data: data2 } = await client.anthropic.raw.POST('/messages', {
  body: {
    model: 'claude-sonnet-4',
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Hello!' }],
  },
});
```

The same API key works for both surfaces. Model catalog: [alltoken.ai/models](https://alltoken.ai/models).

## Configuration

```ts
new AllToken({
  apiKey: '...',                        // required
  baseURL: 'https://api.alltoken.ai',   // optional, defaults to production
  fetch: customFetch,                   // optional, defaults to globalThis.fetch
  defaultHeaders: { 'X-My-Tag': 'a' },  // optional, merged into every request
});
```

## API surface

| Field | Spec | Base URL |
|---|---|---|
| `client.openai.raw` | `chat.yml` (OpenAI-compatible) | `https://api.alltoken.ai/v1` |
| `client.anthropic.raw` | `anthropic.yml` | `https://api.alltoken.ai/anthropic` |

`.raw` is the typed [openapi-fetch](https://openapi-ts.dev/openapi-fetch/) client. All routes, request bodies, and response types are auto-generated from the OpenAPI specs — you get full IDE autocomplete with no manual type wrangling.

## Status

**v0.1.0 — Scaffold.** Types are generated from the spec, the wrapper surface is minimal. Expect breaking changes in 0.x. Production-ready ergonomic helpers (`chat.completions.create(...)`, streaming iterators, retries, etc.) are coming in 0.2.x.

## Contributing / Local development

```bash
# Clone megaopenrouter as a sibling (for the OpenAPI specs)
git clone git@gitlab.53site.com:ai-innovation-lab/megaopenrouter.git ../megaopenrouter

# Install + regenerate types from specs
npm install
npm run generate

# Build + typecheck
npm run build
npm run typecheck
npm test
```

Types live in `src/generated/{chat,anthropic}.d.ts` — these are **committed** so users who install from npm don't need to run codegen.

## License

[MIT](./LICENSE)
