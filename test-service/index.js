const path = require('path');
const express = require('express');

const { service } = require('../src');
const LocalRegistry = require('./local-registry');

const app = express();
app.use('/', service({
  registry: new LocalRegistry({
    base: path.join(__dirname, 'components'),
  }),
}));

app.listen(3000);
