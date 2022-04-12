const { createCoreController } = require("@strapi/strapi").factories;
const modelUid = "api::comment.comment";

module.exports = createCoreController(modelUid, ({ strapi }) => ({
  async createComment(ctx) {
    const { id } = ctx.params;
    const { content } = ctx.request.body;
    const { user } = ctx.state;
    const comment = await strapi.query(modelUid).create({
      data: {
        post: id,
        author: user.id,
        content,
      },
    });
    ctx.send(comment);
  },
  async getComments(ctx) {
    const { id } = ctx.params;
    const comments = await strapi.query(modelUid).findMany({
      post: id,
    });
    ctx.send(comments);
  },
}));
