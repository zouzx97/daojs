import { Loader } from '@daojs/calculation-network';
import register from './rpc-server';
import * as coreProcedures from './procedures';

let contextNetwork = null;

function setup({ procedures = {}, story = {} }) {
  contextNetwork = new Loader({
    ...procedures,
    ...coreProcedures,
  }).load(story);
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

register({
  get,
  set,
  setup,
  teardown,
});

