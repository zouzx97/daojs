import _ from 'lodash';
import { List, Map } from 'immutable';
import Promise from 'bluebird';

class Strategy {
  registry = Map()

  register = (definitions = {}) => {
    this.registry = this.registry.merge(definitions);
  }

  get = name => Promise.resolve(this.registry.get(name, null))
}

class AsyncStrategy extends Strategy {
  get = name => (this.registry.has(name) ?
    Promise.resolve(this.registry.get(name)()) :
    Promise.resolve(null))
}


export default class AsyncRegistry {
  defaultStrategy = new Strategy()
  defaultAsyncStrategy = new AsyncStrategy()

  strategies = List([
    this.defaultStrategy,
    this.defaultAsyncStrategy,
  ])

  get = name => Promise.reduce(
    this.strategies.toArray(),
    (memo, strategy) => memo || strategy.get(name),
    null,
  ).catch(() => _.constant(null))

  addStrategy = (strategy) => {
    this.strategies = this.strategies.push(strategy);
    return this;
  }

  register = (definitions = {}) => {
    this.defaultStrategy.register(definitions);
    return this;
  }

  registerAsync = (definitions = {}) => {
    this.defaultAsyncStrategy.register(definitions);
    return this;
  }
}
