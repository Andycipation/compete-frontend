/*
Configuration information.

Note: when `DOMAIN` expires, this whole thing probably has to be reconfigured
since the backend is not able to set cookies on the frontend unless they are
hosted from the same domain.
(Also, this domain cannot be one that is on the Public Suffix List:
https://devcenter.heroku.com/articles/cookies-and-herokuapp-com)
*/

const DOMAIN = "andrewdong.me";

const config = {
  // compete-backend Heroku project
  BACKEND_SERVER_URL:
    process.env.NODE_ENV == "production"
      ? `https://api.compete.${DOMAIN}`
      : "http://localhost:8080",
};

export default config;
