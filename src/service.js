const express = require('express');
const _ = require('lodash');

module.exports = function service({
  registry,
  builders = {},
}) {
  const router = express.Router();

  return router.get('/debug/:scope/:component/:version/:subversion', (req, res) => {
    const {
      scope,
      component,
      version,
      subversion,
    } = req.params;

    registry.source({
      scope,
      component,
      version,
      subversion,
    })
      .then(({ source, type, dependencies }) => (builders[type] || _.property('source'))(_.defaults({
        source,
        dependencies,
        output: 'debug',
      }, req.params)))
      .then((data) => {
        res.set('Content-Type', 'text/javascript');
        res.send(data);
      })
      .catch(err => res.status(500).send(err.toString()));
  });
};
