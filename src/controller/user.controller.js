const { createUser } = require('../service/user.service')

class UserController {
  async register (ctx, next) {
    const { username, password } = ctx.reqest.body
    const res = await createUser(username, password)
    // console.log(res);
    ctx.body = res
  }

  async login (ctx, next) {
    ctx.body = '登录'
  }
}

module.exports = new UserController()