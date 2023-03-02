const jwt = require("jsonwebtoken");

const {
  createUser,
  getUserInfo,
  updateById,
} = require("../service/user.service");
const {
  userRegisterError,
  changePasswordError,
  invalidPassword,
} = require("../constant/err.types");

const { JWT_SECRET } = require("../config/config.defult");

class UserController {
  async register(ctx, next) {
    const { username, password } = ctx.request.body;
    try {
      const res = await createUser(username, password);
      ctx.body = {
        code: 0,
        message: "用户注册成功！",
        result: res,
      };
    } catch (err) {
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }

  async login(ctx, next) {
    const { username } = ctx.request.body;
    try {
      const { password, ...res } = await getUserInfo({ username });
      ctx.body = {
        code: 0,
        message: "用户登录成功！",
        result: {
          token: jwt.sign(res, JWT_SECRET, {
            expiresIn: "1d",
          }),
        },
      };
    } catch (err) {
      console.error("用户登录失败！", err);
    }
  }

  async changePassword(ctx, next) {
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    try {
      const res = await updateById({ id, password });
      if (res) {
        ctx.body = {
          code: 0,
          message: "密码修改成功！",
          result: "",
        };
      }
    } catch (err) {
      ctx.app.emit("error", changePasswordError, ctx);
    }
  }
}

module.exports = new UserController();
