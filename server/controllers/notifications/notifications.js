const { Post } = require("../../models/post/post");
const { Comment } = require("../../models/comment/comment");
const { Like } = require("../../models/likes/likes");
const { User } = require("../../models/auth/user");
const mongoose = require("mongoose");
const { Notification } = require("../../models/notifications/notifications");

exports.getNotifications = async (req, res, next) => {
  const { userId } = req.query;

  let notifications = await Notification.aggregate([
    {
      $match: {
        $or: [
          { likeId: { $exists: true } },
          { commentId: { $exists: true } },
          {
            taggedId: mongoose.Types.ObjectId(userId),
          },
          {
            followedUserId: mongoose.Types.ObjectId(userId),
          },
        ],
      },
    },
    {
      $match: {
        $expr: {
          $ne: ["$userId", mongoose.Types.ObjectId(userId)],
        },
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "postId",
        foreignField: "_id",
        as: "postId",
      },
    },
    // { $unwind: "$postId" },
    {
      $match: {
        $or: [
          { taggedId: mongoose.Types.ObjectId(userId) },
          { "postId.userId": mongoose.Types.ObjectId(userId) },
          {
            followedUserId: mongoose.Types.ObjectId(userId),
          },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$userId"] },
            },
          },
          { $project: { fullName: 1, userName: 1, email: 1, image: 1 } },
        ],
        as: "userId",
      },
    },
    { $unwind: "$userId" },
    { $sort: { createdAt: -1 } },
  ]);

  let unreadNotificationsCount = 0;

  notifications.map((notification) => {
    if (!notification.read) {
      unreadNotificationsCount++;
    }
  });

  return res.status(200).send({
    notifications: notifications,
    unreadNotificationsCount: unreadNotificationsCount,
  });
};
exports.updateNotification = async (req, res, next) => {
  const id = req.params.id;
  const updatedNotification = {
    read: true,
  };

  const result = await Notification.findByIdAndUpdate(id, updatedNotification);

  const post = await Notification.findById(id)
    .populate("postId")
    .populate("postId.userId");

  const likes = await Like.find({ postId: post.postId._id });
  let likesCount = 0;
  likes.map((like) => {
    if (like.like === true) {
      likesCount++;
    }
  });
  const comments = await Comment.find({ postId: post.postId._id });

  return res.status(200).send({
    post: post,
    likes: { count: likesCount, likes: likes },
    comments: comments,
  });
};

exports.deleteUserNotifications = async (userId) => {
  await Notification.deleteMany({ userId: userId });
};

exports.toggleNotification = async (req, res, next) => {
  const { notificationOption, userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).send("User not found");
  }
  const client = {
    notification: notificationOption,
  };
  const updatedUser = await User.findByIdAndUpdate(userId, client);
  return res.status(200).send({ notification: notificationOption });
};
exports.deleteNotification = async (req, res, next) => {
  const id = req.params.id;
  const notification = await Notification.findById(id).lean();
  if (!notification) {
    return res.status(400).send("Notification not found");
  }
  const result = await Notification.findByIdAndDelete(id);
  res.status(200).send(result);
};
