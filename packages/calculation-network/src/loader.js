const _ = require('lodash');
const Promise = require('bluebird');
const CalculationNetwork = require('./calculation-network');

function preprocess(obj, deps = {}) {
  if (_.isArray(obj)) {
    _.forEach(obj, elem => preprocess(elem, deps));
  }
  if (_.isObject(obj)) {
    const ref = obj.$ref;

    if (_.isString(ref)) {
      deps[ref] = true;
    } else {
      _.forEach(obj, elem => preprocess(elem, deps));
    }
  }
  return _.keys(deps);
}

function evaluate(obj, registry, context = {}) {
  if (_.isArray(obj)) {
    return Promise.all(_.map(obj, elem => evaluate(elem, registry, context)));
  }
  if (_.isObject(obj)) {
    const ref = obj.$ref;

    if (_.isString(ref)) {
      return context[ref];
    }

    const proc = obj.$proc;

    if (_.isString(proc)) {
      return Promise.all([
        evaluate(obj.$args || [], registry, context),
        registry.get(proc),
      ]).spread((data, callback) => {
        if (!_.isFunction(callback)) {
          throw new Error(`Invalid procedure "${proc}"`);
        }
        return callback(data);
      });
    }

    const props = Promise.props(_.mapValues(obj, elem => evaluate(elem, registry, context)));

    return proc && proc.$ref ? props.then(val => evaluate(val, registry, context)) : props;
  }
  return obj;
}

class Loader {
  constructor(registry) {
    this.registry = registry;
  }

  load(json) {
    const dependencies = _.mapValues(json, value => preprocess(value));
    const params = _.chain(dependencies)
      .pickBy(deps => _.isEmpty(deps))
      .mapValues((deps, key) => evaluate(json[key], this.registry))
      .value();
    const cells = _.chain(dependencies)
      .omitBy(deps => _.isEmpty(deps))
      .mapValues((deps, key) => ({
        dependencies: deps,
        factory: (...values) => evaluate(json[key], this.registry, _.zipObject(deps, values)),
      }))
      .value();

    return Promise
      .props(params)
      .then(parameters => new CalculationNetwork({ parameters, cells }));
  }
}


module.exports = Loader;
