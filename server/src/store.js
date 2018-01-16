const _ = require('lodash');

const registry = {};

function add(name, {
  dependencies,
  content,
}) {
  registry[name] = { dependencies, content };
}

function preprocess({ content, dependencies: deps }) {
  const imports = _.map(_.defaults({
    React: 'react',
  }, deps), (d, variable) => {
    const dep = _.has(registry, d) ? `./${d}` : d;
    return `import ${variable} from '${dep}';`;
  }).join('\n');

  return `${imports}\n${content}`;
}

function closure(name) {
  const result = {};
  function find(name) {
    if (!_.has(result, name) && _.has(registry, name)) {
      const data = result[`${name}.js`] = preprocess(registry[name]);
      console.log(data);
      _.forEach(registry[name].dependencies, find);
    }
  }
  find(name);
  return result;
}

function list() {
  return _.keys(registry).concat([
    'react-dom',
  ]);
}

module.exports = {
  add,
  list,
  closure,
};
