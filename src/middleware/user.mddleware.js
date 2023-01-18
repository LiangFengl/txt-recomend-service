const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExited } = require('../constant/err.types')


const userValidator = async (ctx, next) => {
  const { username, password } = ctx.reqest.body
  // 登录校验
  if (!username || !password) {
    console.error('用户名或密码为空！', ctx.reqest.body);
    ctx.app.emit('error', userFormateError, ctx)
    return
  }
  await next()
}

const verifyUser = async (ctx, next) => {
  const { username } = ctx.reqest.body
  if (await getUserInfo({ username })) {
    ctx.app.emit('error', userAlreadyExited, ctx)
    return
  }
  await next()
}

module.exports = {
  userValidator,
  verifyUser,
}