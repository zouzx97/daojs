const express = require('express');
const build = require('./build');
const {closure} = require('../store');

const router = express.Router();
router.get('/:entry', function (req, res) {
  const { entry } = req.params;
  closure(entry).then((result) =>
    build(entry, result).then((data) => {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(data);
    }));
});

module.exports = router;
