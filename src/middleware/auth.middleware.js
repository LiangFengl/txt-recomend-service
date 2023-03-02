const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.defult')
const { tokenExpiredError, invalidToken } = require('../constant/err.types')

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    // user中包含payload的信息(id, username, is_admin)
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期！')
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token!', err);
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }
  ctx.body = '修改成功！'
  await next()
}

module.exports = {
  auth
}