const clientRoutes = require("./auth/user");
const postRoutes = require("./post/post");
const likesRoutes = require("./likes/likes");
const storiesRoutes = require("./stories/stories");
const favouritesRoutes = require("./favourites/favourites");
const searchRoutes = require("./search/search");
const followRoutes = require("./follow/follow");
const messageRoutes = require("./message/message");
const contactsRoutes = require("./contacts/contacts");
const commentRoutes = require("./comment/comment");

module.exports = [].concat(
  clientRoutes,
  postRoutes,
  storiesRoutes,
  likesRoutes,
  followRoutes,
  searchRoutes,
  favouritesRoutes,
  messageRoutes,
  contactsRoutes,
  commentRoutes
);
