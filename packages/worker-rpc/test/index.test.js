import { expect } from 'chai';
import { workerURL } from './worker-utility';
import createClient from '../src/client';

describe('Echo server', () => {
  const url = workerURL('echo.js');
  let client = null;

  beforeEach(async () => {
    client = await createClient(url);
  });

  it('should has the echo procedure', () => {
    expect(client.echo).is.a('function');
  });

  it('should echo the input', async () => {
    const text = 'Hello, world!';
    expect(await client.echo(text)).to.equal(text);
  });
});
