import { expect } from 'chai';

describe('fake test', () => {
  it('should fail', async () => {
    expect(await new Promise((resolve, reject) => {
      const worker = new Worker('/base/test/test-worker.js');

      worker.onmessage = message => resolve(message.data);
      worker.onerror = reject;

      worker.postMessage('Hello');
    })).to.equal('Hello');
  });
});
