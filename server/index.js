'use strict';

const koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mount = require('koa-mount');
const koaStatic = require('koa-static');
const render = require('../dist/server').default;

const co = require('co')
const Readable = require('stream').Readable;


const app = koa();
const router = new Router();

let todos = [];
let todoId = 0;


router.get('/', function* () {
  const dom = render({ todos: [] });
  const stream = new Readable();
  stream._read = () => {};
  this.body = stream;
  this.type = 'html';
  stream.push(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Server Rendered</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/static/client.css" />
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify({ todos: [] })}
        </script>
      </head>
      <body>
        <div id="container">
          ${dom}
        </div>
        <script src="/static/client.js"></script>
  `);
  co(function* () {
    yield cb => setTimeout(cb, 1800);
    stream.push(`
      <script>
        window.__DISPATCH__({ type: 'get', body: ${JSON.stringify(todos)}});
      </script>
    `);
    stream.push('</body></html>');
    stream.push(null);
  }).catch(e => {});
});

router.get('/todo/', function* () {
  this.body = JSON.stringify(todos);
  this.type = 'json';
});

router.post('/todo/', bodyParser(), function* () {
  const item = {};
  item.id = todoId++;
  item.text = this.request.body.text;
  this.body = JSON.stringify({
    success: true,
  });
  todos.push(item);
  this.type = 'json';
});

router.del('/todo/:id', bodyParser(), function* () {
  let index;
  const id = parseInt(this.params.id);
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      index = i;
      break;
    }
  }
  todos = todos.splice(index, 1);
  this.body = JSON.stringify({
    success: true,
  });
  this.type = 'json';
});

router.put('/todo/:id', bodyParser(), function* () {
  let index;
  const id = parseInt(this.params.id);
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      index = i;
      break;
    }
  }
  todos[index].text = this.request.body.text;
  this.body = JSON.stringify({
    success: true,
  });
  this.type = 'json';
})

app.use(router.routes());
app.use(router.allowedMethods());
app.use(mount('/static', koaStatic(path.resolve(__dirname, '../dist/static'))));
app.listen(3000);
