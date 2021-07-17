const { Like } = require("../../models/likes/likes");

exports.addLike = async (req, res, next) => {
  const { userId, postId, like } = req.body;
  const liked = await Like.findOne({ userId, postId }).lean();
  let result;
  if (liked) {
    const newLike = {
      userId,
      postId,
      like,
    };

    result = await Like.findByIdAndUpdate(liked._id, newLike);
  } else {
    const newLike = new Like({
      userId,
      postId,
      like,
    });

    result = await newLike.save();
  }

  return res.status(200).send(result);
};

exports.deleteUserLikes = async (userId) => {
  await Like.deleteMany({ userId, userId });
};
