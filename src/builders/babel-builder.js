const _ = require('lodash');
const { transform } = require('babel-core');

function preprocess({ source, dependencies }) {
  const imports = _.map(dependencies, (v, c) => `import ${v} from '${c}';`);
  return imports.concat(source).join('\n');
}

module.exports = function babelBuilder(options = {
  ast: false,
  presets: ['env', 'react'],
  plugins: ['transform-es2015-modules-amd'],
}) {
  return ({
    scope,
    component,
    version,
    output,
    source,
    dependencies,
  }) => Promise.resolve({ source, dependencies })
    .then(preprocess)
    .then(src => transform(src, _.defaults({
      sourceFileName: `daojs:///${scope}/${component}@${version}.js`,
      sourceMaps: output === 'debug' ? 'inline' : false,
    }, options)))
    .then(_.property('code'));
};
