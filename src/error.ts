export class AllTokenError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(status: number, body: string) {
    super(`AllToken API error ${status}: ${body}`);
    this.name = 'AllTokenError';
    this.status = status;
    this.body = body;
  }
}
