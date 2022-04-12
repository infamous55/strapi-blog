module.exports = {
  routes: [
    {
      method: "POST",
      path: "/posts/:id/comments",
      handler: "custom-controller.createComment",
      config: {
        policies: ["global::isAuthenticated"],
        description: "Create a comment for a post",
      },
    },
    {
      method: "GET",
      path: "/posts/:id/comments",
      handler: "custom-controller.getComments",
      config: {
        description: "Get all comments of a post",
      },
    },
    {
      method: "GET",
      path: "/posts/:id/comments/:commentId",
      handler: "custom-controller.getComment",
      config: {
        description: "Get a comment of a post",
      },
    },
    {
      method: "PUT",
      path: "/posts/:id/comments/:commentId",
      handler: "custom-controller.updateComment",
      config: {
        description: "Update one comment of a post",
      },
    },
    {
      method: "DELETE",
      path: "/posts/:id/comments/:commentId",
      handler: "custom-controller.deleteComment",
      config: {
        description: "Delete one comment of a post",
      },
    },
  ],
};
