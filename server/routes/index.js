const clientRoutes = require("./auth/user");
const postRoutes = require("./post/post");
const storiesRoutes = require("./stories/stories");
const followRoutes = require("./follow/follow");

module.exports = [].concat(
  clientRoutes,
  postRoutes,
  storiesRoutes,
  followRoutes
);
