//操作数据库
const { where } = require("sequelize");
const User = require("../model/user.model");

class UserService {
  // 用户注册
  async createUser(username, password) {
    const res = await User.create({ username, password });
    return res.dataValues;
  }

  // 判断用户是否存在，不存在则存储
  async getUserInfo({ id, username, password, is_admin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    username && Object.assign(whereOpt, { username });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });
    const res = await User.findOne({
      attributes: ["id", "username", "password", "is_admin"],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }

  async updateById({ id, username, password, is_admin }) {
    const whereOpt = { id };
    const newUser = {};

    username && Object.assign(newUser, { username });
    password && Object.assign(newUser, { password });
    is_admin && Object.assign(newUser, { is_admin });

    const res = await User.update(newUser, { where: whereOpt });
    return res[0] > 0 ? true : false;
  }
}

module.exports = new UserService();
