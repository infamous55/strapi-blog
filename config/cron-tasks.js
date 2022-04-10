module.exports = {
  "* * * * *": {
    task: async ({ strapi }) => {
      console.log("Running task");
      const postsToBePublish = await strapi.db
        .query("api::post.post")
        .findMany({
          where: {
            publishedAt: {
              $null: true,
            },
            publish_at: {
              $lte: new Date(),
            },
          },
        });
      await Promise.all(
        postsToBePublish.map((post) => {
          return strapi
            .service("api::post.post")
            .update(post.id, { data: { publishedAt: new Date() } });
        })
      );
    },
    options: {
      tz: "Europe/Bucharest",
    },
  },
};
