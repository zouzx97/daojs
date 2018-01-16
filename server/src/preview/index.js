const express = require('express');
const router = express.Router();

router.get('/:entry', (req, res) => {
  res.render('preview', req.params);
});

module.exports = router;
