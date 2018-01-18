const express = require('express');
const _ = require('lodash');

module.exports = function service({
  registry,
  builders = {},
}) {
  const router = express.Router();

  return router.get('/:scope/:component/:version/:subversion/:output', (req, res) => {
    const {
      scope,
      component,
      version,
      subversion,
      output,
    } = req.params;

    registry.source({
      scope,
      component,
      version,
      subversion,
    })
      .then(({ source, type }) => (builders[type] || _.property('source'))({ source, output }))
      .then((data) => {
        res.set('Content-Type', 'text/javascript');
        console.log(data);
        res.send(data);
      })
      .catch(err => res.status(500).send(err.toString()));
  });
};
