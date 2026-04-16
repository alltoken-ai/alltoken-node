import { describe, it, expect } from 'vitest';
import { AllToken, AllTokenError, AllTokenStream } from '../src/index';

describe('AllToken', () => {
  it('creates a client with API key', () => {
    const client = new AllToken({ apiKey: 'test-key' });
    expect(client).toBeDefined();
    expect(client.openai).toBeDefined();
    expect(client.anthropic).toBeDefined();
  });

  it('exposes openai.raw and anthropic.raw', () => {
    const client = new AllToken({ apiKey: 'test-key' });
    expect(client.openai.raw).toBeDefined();
    expect(client.anthropic.raw).toBeDefined();
  });

  it('exposes chat.completions', () => {
    const client = new AllToken({ apiKey: 'test-key' });
    expect(client.openai.chat).toBeDefined();
    expect(client.openai.chat.completions).toBeDefined();
    expect(typeof client.openai.chat.completions.create).toBe('function');
  });

  it('exports AllTokenError', () => {
    const err = new AllTokenError(401, 'Unauthorized');
    expect(err).toBeInstanceOf(Error);
    expect(err.status).toBe(401);
    expect(err.body).toBe('Unauthorized');
    expect(err.message).toBe('AllToken API error 401: Unauthorized');
    expect(err.name).toBe('AllTokenError');
  });

  it('exports AllTokenStream', () => {
    expect(AllTokenStream).toBeDefined();
    expect(typeof AllTokenStream).toBe('function');
  });
});
