const express = require('express');
const registry = require('./registry/index');
const app = express();

app.get('/', function(req, res){
  res.send('hello world!');
});

app.route('/registry/:componentname/:version')
.get(registry.get)
.post(registry.post);

app.listen(3000);
