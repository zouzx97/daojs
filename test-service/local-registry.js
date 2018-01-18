const path = require('path');
const fs = require('fs-extra');

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
    const dir = path.join(this.base, scope, component, version);
    return fs
      .readFile(path.join(dir, `${subversion}.js`), 'utf8')
      .then(source => ({ source, type: 'babel' }));
  }
};
