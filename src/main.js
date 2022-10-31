const Koa = require('koa');
const app = new Koa();

//配置路由


//添加中间件
app.use(async (ctx, next) => {
  ctx.body = 'hello koa';
})

app.listen(3000, () => {
  console.log('serve is runing on http://localhost:3000')
})