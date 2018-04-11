const _ = require('lodash');
const Promise = require('bluebird');
const CalculationNetwork = require('./calculation-network');

function preprocess(obj, procs, deps = {}) {
  if (_.isArray(obj)) {
    _.forEach(obj, elem => preprocess(elem, procs, deps));
  }
  if (_.isObject(obj)) {
    const ref = obj.$ref;
    const proc = obj.$proc;

    if (_.isString(ref)) {
      deps[ref] = true;
    } else {
      if (_.isString(proc) && !_.isFunction(procs[proc])) {
        throw new Error(`Invalid procedure "${proc}"`);
      }
      _.forEach(obj, elem => preprocess(elem, procs, deps));
    }
  }
  return _.keys(deps);
}

function evaluate(obj, procs, context = {}) {
  if (_.isArray(obj)) {
    return Promise.all(_.map(obj, elem => evaluate(elem, procs, context)));
  }
  if (_.isObject(obj)) {
    const ref = obj.$ref;

    if (_.isString(ref)) {
      return context[ref];
    }

    const proc = obj.$proc;

    if (_.isString(proc)) {
      return evaluate(obj.$args || [], procs, context).then(procs[proc]);
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
    const dependencies = _.mapValues(json, value => preprocess(value, this.procs));
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
