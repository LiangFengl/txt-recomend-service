const { createUser } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.types')

class UserController {
  async register (ctx, next) {
    const { username, password } = ctx.reqest.body
    try {
      const res = await createUser(username, password)
      ctx.body = {
        code: 0,
        message: '用户注册成功！',
        result: res,
      }
    } catch (err) {
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login (ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()