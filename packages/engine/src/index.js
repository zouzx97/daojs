import { Loader } from '@daojs/calculation-network';
import Registry from '@daojs/registry';
import registerProcedures from '@daojs/worker-rpc/server';
import builtinProcedures from '@daojs/procedures/builtin';

const ProcedureRegistry = new Registry()
  .register(builtinProcedures);

let contextNetwork = null;

function setup(story = {}) {
  contextNetwork = new Loader(ProcedureRegistry).load(story);
}

async function set(key, value) {
  return (await contextNetwork).set({ [key]: value });
}

async function get(key) {
  return (await contextNetwork).get(key);
}

function teardown() {
  contextNetwork = null;
}

registerProcedures({
  get,
  set,
  setup,
  teardown,
});
