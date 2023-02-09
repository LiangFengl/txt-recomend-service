const Router = require('koa-router')

const { userValidator, verifyUser, crpytPassword } = require('../middleware/user.mddleware')
const { register, login } = require('../controller/user.controller')

const router = new Router({ prefix: '/' })


//注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register)
router.post('/login', login)

module.exports = router