const clientRoutes = require("./auth/user");
const postRoutes = require("./post/post");

module.exports = [].concat(clientRoutes, postRoutes);
