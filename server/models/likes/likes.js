const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { Schema } = mongoose;

const likesSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: "post",
    },
    like: {
      type: Boolean,
    },
  },

  {
    timestamps: true,
  }
);
const Like = mongoose.model("likes", likesSchema);

module.exports.Like = Like;
