module.exports = ({ env }) => ({
  apiToken: {
    salt: env("API_TOKEN_SALT", "api_token_salt"),
  },
  auth: {
    secret: env("ADMIN_JWT_SECRET", "admin_jwt_secret"),
  },
  url: "/dashboard",
});
