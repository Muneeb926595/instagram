const mongoose = require("mongoose");
const { Schema } = mongoose;
const follower = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    follower: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    following: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);
const Followers = mongoose.model("follower", follower);
module.exports.Followers = Followers;
