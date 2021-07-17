const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    mediaFiles: [{ type: String }],
    comments: {
      type: mongoose.Schema.ObjectId,
      ref: "comment",
    },
    likes: { type: mongoose.Schema.ObjectId, ref: "likes" },
  },

  {
    timestamps: true,
  }
);
const Post = mongoose.model("post", postSchema);
const validatePost = (post) => {
  const schema = {
    userId: Joi.objectId().required(),
    imageFile: Joi.any(),
  };
  return Joi.validate(post, schema);
};

module.exports.Post = Post;
module.exports.validatePost = validatePost;
