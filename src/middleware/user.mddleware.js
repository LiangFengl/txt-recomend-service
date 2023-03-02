const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword
} = require('../constant/err.types')


// 判断用户名或密码是否为空
const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    console.error('用户名或密码为空！', ctx.request.body);
    ctx.app.emit('error', userFormateError, ctx)
    return
  }
  await next()
}

// 通过校验，进行注册操作
const verifyUser = async (ctx, next) => {
  const { username } = ctx.request.body
  try {
    const res = await getUserInfo({ username })
    if (res) {
      console.error('用户已经存在！', { username })
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  } catch (err) {
    console.error(err)
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }

  await next()
}

// 校验，进行登录操作
const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body
  try {
    const res = await getUserInfo({ username })
    // console.log(!res);
    if (!res) {
      console.error('用户不存在！', { username })
      ctx.app.emit('error', userDoesNotExist, ctx)
      return
    }
    if (!bcrypt.compareSync(password, res.password)) {
      console.error('用户密码错误！', { username })
      ctx.app.emit('error', userLoginError, ctx)
      return
    }
  } catch (err) {
    console.error(err);
    return ctx.app.emit('error', invalidPassword, ctx)
  }

  await next()
}

// 加密用户密码
const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash
  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
}