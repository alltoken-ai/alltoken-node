import { describe, it, expect } from 'vitest';
import { AllToken } from '../src/index';

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
});
