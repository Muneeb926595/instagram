const { Favourite } = require("../../models/favourite/favourite");
const mongoose = require("mongoose");

exports.addToFavourite = async (req, res, next) => {
  const { userId, postId, favourite } = req.body;
  const alreadyFavourite = await Favourite.findOne({ userId, postId }).lean();
  let result;
  if (alreadyFavourite) {
    result = await Favourite.findByIdAndDelete(alreadyFavourite._id);
  } else {
    const newFavourite = new Favourite({
      userId,
      postId,
      favourite,
    });

    result = await newFavourite.save();
  }

  return res.status(200).send(result);
};

exports.deleteUserFavourites = async (userId) => {
  await Favourite.deleteMany({ userId, userId });
};
exports.getFavourites = async (req, res, next) => {
  const { userId } = req.params;
  const favourites = await Favourite.aggregate([
    {
      $match: { userId: mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "posts",
        localField: "postId",
        foreignField: "_id",
        as: "postId",
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  return res.status(200).send(favourites);
};

exports.deleteUserFavourites = async (userId) => {
  await Favourite.deleteMany({ userId, userId });
};
