class Agent {
  constructor({ postMessage }) {
    this.postMessage = postMessage;
    this.calls = {};
    this.procedures = {};
    this.idNext = 0;
  }

  handleMessage(data) {
    const { type } = data;
    const handlerName = `on${type}`;

    if (typeof this[handlerName] === 'function') {
      this[handlerName](data);
    }
  }

  onAck() { /* TODO: handle ack */ } // eslint-disable-line

  onSuccess({ id, payload }) {
    this.calls[id].resolve(payload);
    delete this.calls[id];
  }

  onError({ id, payload }) {
    this.calls[id].reject(new Error(payload));
    delete this.calls[id];
  }

  onCall({ id, payload }) {
    const { name, args } = payload;
    const { postMessage } = this;

    postMessage({ id, type: 'Ack' });
    Promise
      .resolve(this.procedures[name])
      .then((procedure) => {
        if (typeof procedure === 'function') {
          return procedure(...args);
        }
        throw new Error(`Procedure "${name}" is not defined`);
      })
      .then(value => postMessage({ id, type: 'Success', payload: value }))
      .catch(({ message }) => postMessage({ id, type: 'Error', payload: message }));
  }

  register(procedures) {
    Object.assign(this.procedures, procedures);
  }

  call(name, ...args) {
    const { postMessage } = this;

    return new Promise((resolve, reject) => {
      const payload = { name, args };
      const id = this.idNext;

      this.idNext += 1;
      this.calls[id] = { resolve, reject };
      postMessage({ type: 'Call', id, payload });
    });
  }
}

export const master = new Agent({ postMessage });

onmessage = ({ data }) => master.handleMessage(data);

export class WorkerAgent extends Agent {
  constructor(url) {
    const worker = new Worker(url);

    super({
      postMessage: worker.postMessage.bind(worker),
    });
    worker.onmessage = ({ data }) => this.handleMessage(data);
  }
}
