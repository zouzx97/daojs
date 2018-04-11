export default function createClient(target) {
  const worker = new Worker(target);
  const calls = {};

  function* generateId() {
    let counter = 0;
    while (true) {
      counter += 1;
      yield counter;
    }
  }

  const idGen = generateId();

  function onmessage({ data }) {
    const { type, id } = data;

    if (type === 'ack') {
      // TODO: handle ack
    } else if (type === 'success') {
      const { value } = data;
      calls[id].resolve(value);
      delete calls[id];
    } else if (type === 'error') {
      const { message } = data;
      calls[id].reject(new Error(message));
      delete calls[id];
    }
  }

  function call(name, ...args) {
    const id = idGen.next().value;

    return new Promise((resolve, reject) => {
      worker.postMessage([id, name, ...args]);
      calls[id] = { resolve, reject };
    });
  }

  function buildClient(names) {
    return names.reduce((memo, name) => Object.assign(memo, {
      [name]: (...args) => call(name, ...args),
    }));
  }

  worker.onmessage = onmessage;

  return call('list').then(buildClient);
}
