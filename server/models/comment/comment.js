const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: "post",
    },
    content: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);
const Comment = mongoose.model("comment", commentSchema);

const validateComment = (comment) => {
  const schema = {
    userId: Joi.objectId().required(),
    postId: Joi.objectId().required(),
    content: Joi.string().min(2).max(255).required(),
    taggedUsers: Joi.array(),
  };
  return Joi.validate(comment, schema);
};

module.exports.Comment = Comment;
module.exports.validateComment = validateComment;
