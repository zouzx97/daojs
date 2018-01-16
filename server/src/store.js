const _ = require('lodash');

const registry = {};

function add(name, {
  dependencies,
  content,
}) {
  registry[name] = { dependencies, content };
}

function closure(name) {
  const result = {};
  function find(name) {
    if (!_.has(result, name)) {
      result[name] = registry[name].content;
      _.forEach(registry[name].dependencies, find);
    }
  }
  find(name);
  return result;
}

module.exports = {
  add,
  closure,
};
