if (window) {
  throw new Error('You should use @daojs/worker-rpc/client for UI thread');
} else {
  throw new Error('You should use @daojs/worker-rpc/server for Worker thread');
}
