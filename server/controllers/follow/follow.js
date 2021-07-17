const { User } = require("../../models/auth/user");
const { Followers } = require("../../models/followers/followers");
const utils = require("../../utils");

exports.followUnfollow = async (req, res, next) => {
  const { userId, id } = req.body;
  if (id == userId) {
    return res.status(400).send("Users can not follow themselves");
  }
  const check = await User.findById({ _id: userId });
  if (!check) {
    return res.status(400).send("User does not Exist");
  }
  const following = await Followers.findOneAndRemove({
    userId: id,
    following: userId,
  });
  const followers = await Followers.findOneAndRemove({
    userId: userId,
    follower: id,
  });

  if (following && followers) {
    return res.status(200).send("User unfollowed Successfully");
  }
  await Followers({ userId: id, following: userId }).save();
  await Followers({ userId: userId, follower: id }).save();
  return res.status(200).send("User followed Successfully");
};

exports.userFollowingsList = async (req, res, next) => {
  const userId = req.params.id;

  const userFollowings = await Followers.find(
    { following: userId },
    { userId: 1, _id: 0 }
  ).populate("userId");

  return res.status(200).send(userFollowings);
};

exports.deleteUserFollowRecords = async (userId) => {
  await Followers.deleteMany({
    $or: [{ userId: userId }, { follower: userId }, { following: userId }],
  });
};

exports.removeFollowerFollowing = async (req, res, next) => {
  const { id1, id2 } = req.body;
  const check = await User.findById({ _id: id1 });
  if (!check) {
    return res.status(400).send("User does not Exist");
  }
  const check2 = await User.findById({ _id: id2 });
  if (!check2) {
    return res.status(400).send("User2 does not Exist");
  }

  const following = await Followers.findOneAndRemove({
    userId: id2,
    following: id1,
  });
  const follower = await Followers.findOneAndRemove({
    userId: id1,
    follower: id2,
  });
  return res.status(200).send("Follower Following Removed Successfully");
};
