const express = require('express');
const registry = require('./registry');
const build = require('./build');
const app = express();

app.use('/registry', registry);
app.use('/build', build);

app.listen(3000);
