const express = require('express');
const router = express.Router();

router.get('/:entry', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.render('preview', req.params);
});

module.exports = router;
