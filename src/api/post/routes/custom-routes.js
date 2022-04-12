module.exports = {
  routes: [
    {
      method: "POST",
      path: "/posts/:id/comments",
      handler: "custom-controller.createComment",
      config: {
        policies: ["global::isAuthenticated"],
        description: "Create a comment",
      },
    },
    {
      method: "GET",
      path: "/posts/:id/comments",
      handler: "custom-controller.getComments",
      config: {
        description: "Get all comments for a post",
      },
    },
  ],
};
