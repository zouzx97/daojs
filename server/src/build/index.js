const express = require('express');
const build = require('./build');
const {closure} = require('../store');

const router = express.Router();
router.get('/:entry', function (req, res) {
  const { entry } = req.params;
  build(entry, closure(entry)).then((data) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(data);
  });
});

module.exports = router;
