const Promise = require('bluebird');
const _ = require('lodash');

class CalculationNetwork {
  constructor({
    parameters,
    cells,
    onInvalidate = _.noop,
    onUpdate = _.noop,
  }) {
    this.onInvalidate = onInvalidate;
    this.onUpdate = onUpdate;

    this.dependencies = {};
    this.dependent = {};
    this.factories = {};

    _.forEach(cells, ({ dependencies, factory }, key) => {
      _.forEach(dependencies, (keyDep) => {
        if (!_.has(parameters, keyDep) && !_.has(cells, keyDep)) {
          throw new Error(`Invalid dependency "${keyDep}"`);
        }

        if (!_.has(this.dependent, keyDep)) {
          this.dependent[keyDep] = [];
        }
        this.dependent[keyDep].push(key);

        if (!_.has(this.dependencies, key)) {
          this.dependencies[key] = [];
        }
        this.dependencies[key].push(keyDep);
      });
      this.factories[key] = factory;
    });

    this.validateGraph();

    this.parameters = _.clone(parameters);
    this.cache = _.mapValues(parameters, Promise.resolve);
  }

  validateGraph() {
    let g = _.clone(this.dependencies);

    function reduce(graph) {
      return _.pickBy(graph, deps => _.some(deps, dep => _.has(graph, dep)));
    }

    while (!_.isEmpty(g)) {
      const h = reduce(g);
      if (_.size(h) === _.size(g)) {
        throw new Error('Circular dependencies detected');
      }
      g = h;
    }
  }

  set(updates) {
    const invalidKey = _.find(_.keys(updates), key => !_.has(this.parameters, key));

    if (invalidKey) {
      throw new Error(`Invalid parameter "${invalidKey}"`);
    }

    const changes = _.omitBy(updates, (value, key) => value === this.parameters[key]);
    const invalidated = this.invalidate(_.keys(changes));

    _.extend(this.parameters, changes);
    _.extend(this.cache, _.mapValues(changes, Promise.resolve));
    _.forEach(changes, (value, key) => this.onUpdate(key, value));

    return _.keys(invalidated);
  }

  get(key) {
    if (!_.has(this.cache, key)) {
      if (!_.has(this.factories, key)) {
        throw new Error(`Invalid cell or parameter "${key}"`);
      }

      const deps = this.dependencies[key] || [];
      const factory = this.factories[key];

      this.cache[key] = Promise
        .all(_.map(deps, dep => this.get(dep)))
        .then(args => factory(...args))
        .tap(value => this.onUpdate(key, value));
    }
    return this.cache[key];
  }

  invalidate(keys, invalidated = {}) {
    _.forEach(keys, (key) => {
      if (_.has(this.cache, key)) {
        delete this.cache[key];
        invalidated[key] = true;
        this.onInvalidate(key);
        this.invalidate(this.dependent[key] || [], invalidated);
      }
    });

    return invalidated;
  }
}

module.exports = CalculationNetwork;
