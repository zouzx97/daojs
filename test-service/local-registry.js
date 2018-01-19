const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const Promise = require('bluebird');

function toInteger(number) {
  return parseInt(number, 10);
}

function isInteger(number) {
  return toInteger(number).toString() === number.toString();
}

function latest({ scope, component, version }) {
  const dir = path.join(this.base, scope, component, version);
  return Promise
    .resolve(fs.readdir(dir))
    .then(names => names.filter(isInteger))
    .then(names => Math.max(...names.map(toInteger)))
    .then(number => number.toString());
}

function metadata({
  scope,
  component,
  version,
  subversion,
}) {
  return Promise
    .resolve(subversion || latest.call(this, { scope, component, version }))
    .then(sub => path.join(this.base, scope, component, version, sub))
    .then(dir => fs.readFile(path.join(dir, 'metadata.yaml')))
    .then(yaml.safeLoad);
}

function parseComponentName(name) {
  const match = name.match(/([_$.a-zA-Z0-9-]+)\/([_$.a-zA-Z0-9-]+)@([0-9]+)/);
  const [, scope, component, version] = match;

  return { scope, component, version };
}

function resolve(options, context = {}) {
  const {
    scope,
    component,
    version,
    subversion,
  } = options;
  const key = `${scope}/${component}@${version}`;

  if (!_.has(context, key)) {
    const data = { subversion };

    _.assign(context, { [key]: data });
    return metadata
      .call(this, options)
      .tap(({ name }) => { data.name = name; })
      .then(({ dependencies }) => _.keys(dependencies))
      .map(parseComponentName)
      .map(opt => latest.call(this, opt).then(sub => _.defaults({ subversion: sub }, opt)))
      .map(opt => resolve.call(this, opt, context))
      .all()
      .then(() => context);
  }

  return Promise.resolve(context);
}

module.exports = class LocalRegistry {
  constructor({ base }) {
    this.base = base;
  }

  source({
    scope,
    component,
    version,
    subversion,
  }) {
    const dir = path.join(this.base, scope, component, version, subversion);
    return fs.readFile(path.join(dir, 'source.js'), 'utf8');
  }

  metadata(options) {
    return metadata.call(this, options);
  }

  resolve(options) {
    return resolve.call(this, options);
  }
};
