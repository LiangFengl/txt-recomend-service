const { Sequelize } = require('sequelize')

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB
} = require('../config/config.defult')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
})

// 调试连接数据库
// seq.authenticate().then(() => {
//   console.log('数据库连接成功！');
// }).catch((err) => {
//   console.log('数据库连接失败！', err);
// })

module.exports = seq