# Strapi Blog

This is a simple API for a blog.

## Description

This repository contains a template for a blog API created using [Strapi](https://strapi.io/). It handles posts, user authentication, authorization, and includes a comment system.

The posts contain a cover image and can be scheduled. The endpoint `/api/posts/:postId/comments/:commentId` is used for managing the comments for each post. The _Global_ single type stores information about the entire website. The database and plugins configuration is meant for deployment to the [Digital Ocean App Platform](https://www.digitalocean.com/products/app-platform) with [Storage Spaces](https://www.digitalocean.com/products/spaces).
