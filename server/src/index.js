const express = require('express');
const proxy = require('express-http-proxy');
const registry = require('./registry');
const build = require('./build');
const preview = require('./preview');

const app = express();

app.set('view engine', 'pug');
app.use('/registry', registry);
app.use('/build', build);
app.use('/preview', preview);
app.use('/ui', proxy('http://localhost:8000'));

app.listen(3000);
