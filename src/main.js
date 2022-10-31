const Koa = require('koa');
const { APP_PORT } = require('./config/config.defult')


const app = new Koa();

//添加中间件
app.use(async (ctx, next) => {
  ctx.body = 'hello koa';
})

app.listen(APP_PORT, () => {
  console.log(`serve is runing on http://localhost:${APP_PORT}`)
})