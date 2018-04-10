import { Loader } from '@daojs/calculation-network';
import register from './rpc-server';
import * as coreProcedures from './procedures';

function registerServer(contextNetwork) {
  return function start() {
    async function set(key, value) {
      return (await contextNetwork).set({ [key]: value });
    }

    async function get(key) {
      return (await contextNetwork).get(key);
    }

    return register({ get, set });
  };
}

export function fuel({ procedures = {}, story = {} }) {
  const contextNetwork = new Loader({
    ...procedures,
    ...coreProcedures,
  }).load(story);

  return {
    start: registerServer(contextNetwork),
  };
}

