const Koa = require('koa')
const { koaBody } = require('koa-body')

const router = require('../router/user.route')
const errHandler = require('../app/errHandler')

const app = new Koa()

app.use(koaBody());
app.use(router.routes())


// 统一进行错误处理
app.on('error', errHandler)

module.exports = app