const express = require('express');
const bodyParser = require('body-parser');
const {add} = require('../store');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => {
});

router.post('/:entry', (req, res) => {
  add(req.params.entry, req.body);
  res.send('OK');
});

module.exports = router;
