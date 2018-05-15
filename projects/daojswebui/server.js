const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const koaBody = require('koa-body');
const rp = require('request-promise');

const cacheManager = require('./cache-manager.js');

const app = new Koa();
const router = new Router();


router.post('/insight', koaBody(), async (ctx, next) => {
  const { body, query, headers } = ctx.request;
  console.log(headers);

  if (cacheManager.isInCache(body)) {
    ctx.body = cacheManager.readFromCache(body);
  } else {
    const result = await rp.post({
      uri: `http://52.175.225.59/api/insight?type=${query.type}`,
      json: true,
      headers: {
        Customer: headers.customer,
        Business: headers.business,
      },
      body,
    });

    cacheManager.writeToCache(body, result);

    ctx.body = result;
  }

  await next();
});

app.use(router.routes()).use(router.allowedMethods());

app.use(serve('./'));

module.exports = app.listen(9000);
