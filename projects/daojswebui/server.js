const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const koaBody = require('koa-body');
const rp = require('request-promise');
const cors = require('@koa/cors');

const cacheManager = require('./cache-manager.js');

const app = new Koa();
const router = new Router();

app.use(cors());

router.post('/insight', koaBody(), async (ctx, next) => {
  const { body, query, headers } = ctx.request;
  console.log(headers);

  try {
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
  } catch (error) {
    console.log('error from server:');
    console.log(error);
    if (cacheManager.isInCache(body)) {
      ctx.body = cacheManager.readFromCache(body);
    } else {
      ctx.body = { error, message: 'error response from server while no cache' };
    }
  }

  await next();
});

router.post('/forward', koaBody(), async (ctx, next) => {
  const { body } = ctx.request;

  const method = body.method && body.method.toLowerCase();

  if (method === 'get') {
    const result = await rp.get({
      uri: body.url,
      json: true,
    });
    ctx.body = result;
  } else if (method === 'post') {
    const result = await rp.post({
      uri: body.url,
      json: true,
      body: body.params,
    });
    ctx.body = result;
  }

  await next();
});

app.use(router.routes()).use(router.allowedMethods());

app.use(serve('./'));

module.exports = app.listen(9000);
