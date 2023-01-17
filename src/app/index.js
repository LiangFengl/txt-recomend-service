const Koa = require('koa')
const { koaBody } = require('koa-body')

const router = require('../router/user.route')

const app = new Koa()

app.use(koaBody());
app.use(router.routes())

module.exports = app