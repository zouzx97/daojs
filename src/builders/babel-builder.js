const _ = require('lodash');
const { transform } = require('babel-core');

module.exports = function babelBuilder(options = {
  ast: false,
  presets: ['env', 'react'],
  plugins: ['transform-es2015-modules-amd'],
}) {
  return ({
    scope,
    component,
    version,
    source,
    output,
  }) => transform(source, _.defaults({
    sourceFileName: `daojs:///${scope}/${component}@${version}.js`,
    sourceMaps: output === 'debug' ? 'inline' : false,
  }, options)).code;
};
