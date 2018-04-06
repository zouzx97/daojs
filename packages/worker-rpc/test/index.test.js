import { expect } from 'chai';
import wu from './worker-utility';
import createClient from '../src/client';

describe('fake test', () => {
  it('should fail', async () => {
    const client = await createClient(wu.workerURL('echo.js'));

    expect(client.echo).is.a('function');
  });
});
