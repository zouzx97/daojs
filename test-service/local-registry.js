const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');

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
    return Promise.all([
      'metadata.yaml',
      'source.js',
    ].map(name => fs.readFile(path.join(dir, name), 'utf8')))
      .then(([metadata, source]) => {
        const { type, dependencies } = yaml.safeLoad(metadata);
        return { type, source, dependencies };
      });
  }
};
