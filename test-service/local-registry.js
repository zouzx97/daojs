const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');

function toInteger(number) {
  return parseInt(number, 10);
}

function isInteger(number) {
  return toInteger(number).toString() === number.toString();
}

function latest({ scope, component, version }) {
  const dir = path.join(this.base, scope, component, version);
  return fs
    .readdir(dir)
    .then(names => names.filter(isInteger))
    .then(names => Math.max(...names.map(toInteger)));
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

  metadata({
    scope,
    component,
    version,
    subversion,
  }) {
    return Promise
      .resolve(subversion || latest({ scope, component, version }))
      .then(sub => path.join(this.base, scope, component, version, sub))
      .then(dir => fs.readFile(path.join(dir, 'metadata.yaml')))
      .then(yaml.safeLoad);
  }
};
