const utils = require("../../utils");
const { isImage, isVideo } = require("../../utils");
const { Post } = require("../../models/post/post");

exports.addPost = async (req, res, next) => {
  const { userId } = req.body;

  let post = new Post({
    userId,
  });

  if (req.files) {
    let mediaFiles = [];
    req.files.forEach((file) => {
      const { destination, filename } = file;
      if (isImage(file.mimetype)) {
        mediaFiles.push(utils.createImageUrl(destination, filename));
      } else if (isVideo(file.mimetype)) {
        mediaFiles.push(utils.createVideoUrl(destination, filename));
      }
    });
    if (mediaFiles.length > 0) {
      post.mediaFiles = mediaFiles;
    }
  }

  const result = await post.save();
  return res.status(200).send(result);
};
