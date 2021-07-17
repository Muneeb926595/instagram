const clientRoutes = require("./auth/user");
const postRoutes = require("./post/post");
const likesRoutes = require("./likes/likes");
const storiesRoutes = require("./stories/stories");
const followRoutes = require("./follow/follow");

module.exports = [].concat(
  clientRoutes,
  postRoutes,
  storiesRoutes,
  likesRoutes,
  followRoutes
);
