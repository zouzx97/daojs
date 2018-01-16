const express = require('express');
const bodyParser = require('body-parser');
const { list, add } = require('../store');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(list()));
});

router.post('/:entry', (req, res) => {
  console.log(req.body);
  add(req.params.entry, req.body);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send('OK');
});

router.options('/:entry', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send('OK');
});

module.exports = router;
