const express = require('express');
const build = require('./build');
const mock = require('./mock');

const router = express.Router();
router.get('/', function (req, res) {
  build('index.js', mock).then((data) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(data);
  });
});

module.exports = router;
