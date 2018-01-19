const path = require('path');
const express = require('express');

const { service, babelBuilder } = require('../src');
const LocalRegistry = require('./local-registry');

const app = express();
app.use('/build', service({
  registry: new LocalRegistry({
    base: path.join(__dirname, 'components'),
  }),
  builders: {
    babel: babelBuilder(),
  },
}));

app.get('/ui/:scope/:component/:version/:subversion', (req, res) => {
  const {
    scope,
    component,
    version,
    subversion,
  } = req.params;
  const url = ['/build/debug', scope, component, version, subversion].join('/');
  res.send(`<html><body><script src="${url}"></script></body> </html>`);
});

app.listen(3000);
