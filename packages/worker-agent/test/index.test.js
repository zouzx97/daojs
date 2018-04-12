import { expect } from 'chai';
import { workerURL } from './worker-utility';
import { WorkerAgent } from '..';

describe('Echo server', () => {
  const url = workerURL('echo.js');
  let agent = null;

  beforeEach(() => {
    agent = new WorkerAgent(url);
  });

  it('should echo the input', async () => {
    const text = 'Hello, world!';
    expect(await agent.call('echo', text)).to.equal(text);
  });
});

describe('Arithmetic server', () => {
  const url = workerURL('arithmetic.js');
  let agent = null;

  beforeEach(() => {
    agent = new WorkerAgent(url);
  });

  it('should do string/array conversions correctly', async () => {
    const str = '1234567';
    const arr = [7, 6, 5, 4, 3, 2, 1];
    expect(await agent.call('string2array', str)).to.deep.equal(arr);
    expect(await agent.call('array2string', arr)).to.equal(str);
  });

  it('should calculate the add method correctly', async () => {
    const strN = '12345678901234567890';
    const str2N = '24691357802469135780';

    expect(await agent.call('add', strN, strN)).to.equal(str2N);
  });
});
