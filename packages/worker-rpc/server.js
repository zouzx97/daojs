const procedures = {
  list: () => Object.keys(procedures),
};

onmessage = ({ data }) => {
  const [id, name, ...args] = data;

  postMessage({ id, type: 'ack' });
  Promise
    .resolve(procedures[name](...args))
    .then(value => postMessage({ id, type: 'success', value }))
    .catch(({ message }) => postMessage({ id, type: 'error', message }));
};

export default function registerProcedures(procs) {
  Object.keys(procs).forEach((name) => {
    if (procedures[name]) {
      throw new Error('Cannot override existing procedure');
    }
    procedures[name] = procs[name];
  });
}
