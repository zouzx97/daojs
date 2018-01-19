const express = require('express');
const _ = require('lodash');

module.exports = function service({
  registry,
  builders = {},
}) {
  const router = express.Router();

  return router.get('/debug/:scope/:component/:version/:subversion', (req, res) => {
    Promise
      .all([
        registry.metadata(req.params),
        registry.source(req.params),
      ])
      .then(([metadata, source]) => {
        const { type } = metadata;
        const builder = builders[type] || _.identity;

        return builder(source, _.defaults({
          output: 'debug',
        }, req.params), metadata);
      })
      .then((code) => {
        res.set('Content-Type', 'text/javascript');
        res.send(code);
      })
      .catch(err => res.status(500).send(err.stack));
  });
};
