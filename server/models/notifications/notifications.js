const mongoose = require("mongoose");

const { Schema } = mongoose;

const notificationsSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    read: { type: Boolean },
    action: { type: String },
    commentId: {
      type: mongoose.Schema.ObjectId,
      ref: "comments",
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: "post",
    },
    followedUserId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    recipeId: {
      type: mongoose.Schema.ObjectId,
      ref: "recipe",
    },
    likeId: {
      type: mongoose.Schema.ObjectId,
      ref: "likes",
    },
    taggedId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  },

  {
    timestamps: true,
  }
);
const Notification = mongoose.model("notifications", notificationsSchema);

module.exports.Notification = Notification;
