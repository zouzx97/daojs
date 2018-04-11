class EventAgent {
  constructor(postMessage) {
    this.postMessage = postMessage;
    this.observers = {};
  }

  on(type, callback) {
    if (!this.observers[type]) {
      this.observers[type] = new Set();
    }
    this.observers[type].add(callback);
  }

  off(type, callback) {
    this.observers[type].delete(callback);
    if (this.observers[type].size === 0) {
      delete this.observers[type];
    }
  }

  trigger(type, payload) {
    const { postMessage } = this;
    postMessage({ type, payload });
  }

  handleMessage(data) {
    const { type, payload } = data;
    (this.observers[type] || []).forEach(callback => callback(payload));
  }
}

class RpcAgent extends EventAgent {
  constructor(postMessage) {
    super(postMessage);

    this.calls = {};
    this.procedures = {};
    this.idNext = 0;

    this.on('rpc-ack', () => {});
    this.on('rpc-success', ({ id, value }) => {
      this.calls[id].resolve(value);
      delete this.calls[id];
    });
    this.on('rpc-error', ({ id, message }) => {
      this.calls[id].reject(new Error(message));
      delete this.calls[id];
    });
    this.on('rpc-call', ({ id, name, args }) => {
      this.trigger('rpc-ack', { id });
      Promise
        .resolve(this.procedures[name])
        .then((procedure) => {
          if (typeof procedure === 'function') {
            return procedure(...args);
          }
          throw new Error(`Procedure "${name}" is not defined`);
        })
        .then(value => this.trigger('rpc-success', { id, value }))
        .catch(({ message }) => this.trigger('rpc-error', { id, message }));
    });
  }

  register(procedures) {
    Object.assign(this.procedures, procedures);
  }

  call(name, ...args) {
    return new Promise((resolve, reject) => {
      const id = this.idNext;

      this.idNext += 1;
      this.calls[id] = { resolve, reject };
      this.trigger('rpc-call', { id, name, args });
    });
  }
}

export class WorkerAgent extends RpcAgent {
  constructor(url) {
    const worker = new Worker(url);

    super(worker.postMessage.bind(worker));
    worker.onmessage = ({ data }) => this.handleMessage(data);
  }
}

export const master = new RpcAgent(postMessage);

onmessage = ({ data }) => master.handleMessage(data);
