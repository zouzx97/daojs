const _ = require('lodash');
const Promise = require('bluebird');
const CalculationNetwork = require('./calculation-network');

function findDependencies(obj, deps = {}) {
  if (_.isArray(obj)) {
    _.forEach(obj, elem => findDependencies(elem, deps));
  }
  if (_.isObject(obj)) {
    const ref = obj['@ref'];

    if (_.isString(ref)) {
      deps[ref] = true;
    } else {
      _.forEach(obj, elem => findDependencies(elem, deps));
    }
  }
  return _.keys(deps);
}

function evaluate(obj, procs, context = {}) {
  if (_.isArray(obj)) {
    return Promise.all(_.map(obj, elem => evaluate(elem, procs, context)));
  }
  if (_.isObject(obj)) {
    const ref = obj['@ref'];

    if (_.isString(ref)) {
      return context[ref];
    }

    const proc = obj['@proc'];

    if (_.isString(proc)) {
      if (_.isFunction(procs[proc])) {
        return evaluate(obj['@args'] || [], procs, context).then(procs[proc]);
      }
      throw new Error(`Unknown procedure "${proc}"`);
    }

    return Promise.props(_.mapValues(obj, elem => evaluate(elem, procs, context)));
  }
  return obj;
}

class Loader {
  constructor(procs = {}) {
    this.procs = procs;
    _.forEach(procs, (proc, name) => {
      if (!_.isFunction(proc)) {
        throw new Error(`Invalid procedure "${name}"`);
      }
    });
  }

  load(json) {
    const dependencies = _.mapValues(json, value => findDependencies(value));
    const params = _.chain(dependencies)
      .pickBy(deps => _.isEmpty(deps))
      .mapValues((deps, key) => evaluate(json[key], this.procs))
      .value();
    const cells = _.chain(dependencies)
      .omitBy(deps => _.isEmpty(deps))
      .mapValues((deps, key) => ({
        dependencies: deps,
        factory: (...values) => evaluate(json[key], this.procs, _.zipObject(deps, values)),
      }))
      .value();

    return Promise
      .props(params)
      .then(parameters => new CalculationNetwork({ parameters, cells }));
  }
}


module.exports = Loader;
