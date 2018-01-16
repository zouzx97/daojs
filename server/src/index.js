const express = require('express');
const registry = require('./registry');
const build = require('./build');
const preview = require('./preview');
const app = express();

app.set('view engine', 'pug');
app.use('/registry', registry);
app.use('/build', build);
app.use('/preview', preview);

app.listen(3000);
