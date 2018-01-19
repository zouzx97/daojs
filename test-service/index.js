const path = require('path');
const express = require('express');

const {
  service,
  babelBuilder,
  cdnBuilder,
} = require('../src');
const LocalRegistry = require('./local-registry');

const registry = new LocalRegistry({
  base: path.join(__dirname, 'components'),
});

const app = express();

app
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, 'views'));

app.use('/build', service({
  registry,
  builders: {
    babel: babelBuilder(),
    cdn: cdnBuilder(),
  },
}));

app.get('/ui/:scope/:component/:version/:subversion', (req, res) => {
  const {
    scope,
    component,
    version,
    subversion,
  } = req.params;
  const urlResolve = ['/resolve', scope, component, version, subversion].join('/');
  const urlMain = ['/build/debug', scope, component, version, subversion, 'index.js'].join('/');
  res.render('index.pug', { urlMain, urlResolve });
});

app.get('/resolve/:scope/:component/:version/:subversion', (req, res) => {
  registry.resolve(req.params).then((closure) => {
    res.jsonp(closure);
  });
});

app.listen(3000);
