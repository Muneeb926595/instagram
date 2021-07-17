const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { Schema } = mongoose;

const storySchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    viewers: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },

  {
    timestamps: true,
  }
);
const Story = mongoose.model("stories", storySchema);
const validateStory = (story) => {
  const schema = {
    userId: Joi.objectId().required(),
    imageFile: Joi.any(),
  };
  return Joi.validate(story, schema);
};

module.exports.Story = Story;
module.exports.validateStory = validateStory;
