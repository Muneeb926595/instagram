const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { Schema } = mongoose;

const favourtiesSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: "post",
    },
    favourite: {
      type: Boolean,
    },
  },

  {
    timestamps: true,
  }
);
const Favourite = mongoose.model("favourites", favourtiesSchema);

module.exports.Favourite = Favourite;
