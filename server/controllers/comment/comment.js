const { Comment, validateComment } = require("../../models/comment/comment");
const mongoose = require("mongoose");

const { Followers } = require("../../models/followers/followers");

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
  const { userId, postId, content } = req.body;
  const comment = new Comment({
    userId,
    postId,
    content,
  });

  const result = await comment.save();
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
