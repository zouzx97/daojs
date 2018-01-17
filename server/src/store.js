const _ = require('lodash');
const { create, get, list } = require('./mongodb/client');

const registry = {};

function add(name, {
  dependencies,
  content,
}) {
  return create({
    name,
    value: {
      dependencies,
      content,
    },
  });
}

function preprocess({ content, dependencies: deps }) {
  const imports = _.map(_.defaults({
    react: 'React',
  }, deps), (variable, d) => {
    const dep = _.has(registry, d) ? `./${d}` : d;
    return `import ${variable} from '${dep}';`;
  }).join('\n');

  return `${imports}\n${content}`;
}

function closure(name) {
  const result = {};

  function find(name) {
    return get({name}).then(results => {  //will add version in closure
      const component = _.last(results);
      if (!_.has(result, name) && component) {
        const data = result[`${name}.js`] = preprocess(component);
        console.log(data);
        const promiseArray = _.map(component.dependencies, (v, d) => find(d));
        return Promise.all(promiseArray);
      }
    });
  }
  return find(name).then(() => result);

}

function listKeys() {
  return list().then(keys => {
    return [...keys, 'react-dom', 'antd'];
  });
}

module.exports = {
  add,
  list: listKeys,
  closure,
};
