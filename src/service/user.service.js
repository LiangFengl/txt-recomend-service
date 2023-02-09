//操作数据库
const User = require('../model/user.model')

class UserService {

  // 用户注册
  async createUser (username, password) {
    const res = await User.create({ username, password })
    return res.dataValues
  }

  async getUserInfo ({ id, username, password, is_admin }) {
    const whereOpt = {}
    id && Object.assign(whereOpt, { id })
    username && Object.assign(whereOpt, { username })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    User.findOne({
      attributes: ['id', 'username', 'password', 'is_admin'],
      where: whereOpt
    })

    return res ? res.dataValues : null
  }
}

module.exports = new UserService()