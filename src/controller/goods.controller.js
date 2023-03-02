class GoodsController {
  async upload(ctx, next) {
    ctx.body = "图书封面上传成功！";
  }
}

module.exports = new GoodsController();
