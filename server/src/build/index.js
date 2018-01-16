const express = require('express');
const build = require('./build');

const router = express.Router();
const mockInput = `
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>Hello world!</div>,
  document.getElementById('container')
);
`;

router.get('/', function (req, res) {
  build('index.js', {
    'index.js': mockInput,
  }).then((data) => {
    res.send(data);
  });
});

module.exports = router;
