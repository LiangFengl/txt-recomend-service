const User = require('../model/user.model')

class UserService {
  async createUser (username, password) {
    // 插入数据
    User.create({ username, password }).then
  }
}

module.exports = new UserService()