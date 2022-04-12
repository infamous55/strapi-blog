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
  async getComment(ctx) {
    const { id, commentId } = ctx.params;
    const comment = await strapi.query(modelUid).findOne({
      where: {
        id: commentId,
      },
      populate: {
        post: true,
      },
    });
    if (!comment || comment.post.id !== parseInt(id)) {
      ctx.throw(404, "Comment not found");
    }
    delete comment.post;
    ctx.send(comment);
  },
  async updateComment(ctx) {
    const { id, commentId } = ctx.params;
    const comment = await strapi.query(modelUid).findOne({
      where: {
        id: commentId,
      },
      populate: {
        author: true,
        post: true,
      },
    });
    if (!comment || comment.post.id !== parseInt(id)) {
      ctx.throw(404, "Comment not found");
    }
    if (comment.author.id !== ctx.state.user.id) {
      ctx.throw(403, "You are not authorized to perform this action");
    }
    const { content } = ctx.request.body;
    const updatedComment = await strapi.query(modelUid).update({
      where: {
        id: commentId,
      },
      data: {
        content,
      },
    });
    ctx.send(updatedComment);
  },
  async deleteComment(ctx) {
    const { id, commentId } = ctx.params;
    let comment = await strapi.query(modelUid).findOne({
      where: {
        id: commentId,
      },
      populate: {
        author: true,
        post: true,
      },
    });
    if (!comment || comment.post.id !== parseInt(id)) {
      ctx.throw(404, "Comment not found");
    }
    if (comment.author.id !== ctx.state.user.id) {
      ctx.throw(403, "You are not authorized to perform this action");
    }
    await strapi.query(modelUid).delete({
      where: {
        id: commentId,
      },
    });
    delete comment.author;
    delete comment.post;
    ctx.send(comment);
  },
}));
