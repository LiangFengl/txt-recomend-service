const { DataTypes } = require('sequelize') // 数据库操作

const seq = require('../db/seq')

// 创建模型(txt_recomend_db_user => tcd_user)
const User = seq.define('tcd_user', {
  // id字段不用写，会自动生成
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码'
  },
})
// 强制同步数据库
// User.sync()

module.exports = User