// 引入Koa框架
const Koa = require('koa')
const { koaBody } = require('koa-body')

// 引入路由
const router = require('../router/user.route')
// 引入错误信息
const errHandler = require('../app/errHandler')

const app = new Koa()

app.use(koaBody());
app.use(router.routes())


// 统一进行错误处理
app.on('error', errHandler)

module.exports = app