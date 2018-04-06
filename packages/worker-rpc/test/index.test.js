import { expect } from 'chai';
import wu from './worker-utility';

describe('fake test', () => {
  it('should fail', async () => {
    expect(await new Promise((resolve, reject) => {
      const worker = new Worker(wu.workerURL('echo.js'));

      worker.onmessage = message => resolve(message.data);
      worker.onerror = reject;

      worker.postMessage('Hello');
    })).to.equal('Hello');
  });
});
