const { Comment, validateComment } = require("../../models/comment/comment");

const { User } = require("../../models/auth/user");
const { Notification } = require("../../models/notifications/notifications");

exports.getComments = async (req, res, next) => {
  const id = req.params.id;
  const comments = await Comment.find({ postId: id })
    .populate("userId", "fullName userName image")
    .sort({ createdAt: -1 });

  return res.status(200).send(comments);
};

exports.addComment = async (req, res, next) => {
  const { error } = validateComment(req.body);
  if (error) {
    return res.status("400").send(error.details[0].message);
  }
  const { userId, postId, content, taggedUsers } = req.body;
  const comment = new Comment({
    userId,
    postId,
    content,
  });

  const result = await comment.save();

  const notification = new Notification({
    userId,
    read: false,
    postId,
    action: "commented on your post",
    commentId: result._id,
  });

  const notificationResult = await notification.save();
  if (taggedUsers && taggedUsers.length > 0) {
    let taggedUserData = [];
    for (i = 0; i < taggedUsers.length; i++) {
      const data = await User.findOne({ _id: taggedUsers[i]._id });
      if (data) {
        taggedUserData.push(data);
      }
    }

    const taggedUserTokens = [];
    taggedUserData.map((taggedUser) => {
      if (taggedUser.token) taggedUserTokens.push(taggedUser.token);
    });

    if (taggedUserTokens.length > 0) {
      const result1 = await utils.pushNotifications(
        taggedUserTokens,
        "User mentioned you on a post",
        "User Name"
      );
    }

    for (i = 0; i < taggedUserData.length; i++) {
      let taggedNotification = new Notification({
        userId,
        read: false,
        postId,
        action: "tagged you on a post",
        taggedId: taggedUserData[i]._id,
      });
      let taggedNotificationResult = await taggedNotification.save();
    }
  }
  return res.status(200).send(result);
};
exports.updateComment = async (req, res, next) => {
  const { error } = validateComment(req.body);
  if (error) {
    return res.status("400").send(error.details[0].message);
  }
  const { userId, postId, content } = req.body;
  const id = req.params.id;
  const comment = {
    userId,
    postId,
    content,
  };

  const result = await Comment.findByIdAndUpdate(id, comment);

  return res.status(200).send(result);
};
exports.deleteComment = async (req, res, next) => {
  const id = req.params.id;
  const result = await Comment.findByIdAndDelete(id);

  return res.status(200).send(result);
};

exports.deleteUserComments = async (userId) => {
  await Comment.deleteMany({ userId: userId });
};
