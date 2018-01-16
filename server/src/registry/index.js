const get = require('./get');
const post = require('./post');

const express = require('express');
const router = express.Router();

router.get('/', require('./get'));
router.post('/', require('./post'));

module.exports = router;
