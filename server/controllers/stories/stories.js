const mongoose = require("mongoose");

const utils = require("../../utils");
const { Followers } = require("../../models/followers/followers");
const { isImage, isVideo } = require("../../utils");
const { Story, validateStory } = require("../../models/stories/stories");

exports.getStories = async (req, res, next) => {
  const { userId } = req.query;

  const stories = await Followers.aggregate([
    { $match: { following: mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "followings",
      },
    },
    { $project: { followings: 1, _id: 1 } },
    { $unwind: "$followings" },
    { $replaceRoot: { newRoot: "$followings" } },
    { $project: { notification: 0, password: 0, token: 0 } },
    {
      $lookup: {
        from: "stories",
        let: {
          id: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$$id", "$userId"] },
                  {
                    $gt: [
                      "$createdAt",
                      new Date(Date.now() - 24 * 60 * 60 * 1000),
                    ],
                  },
                ],
              },
            },
          },
        ],
        as: "stories",
      },
    },
  ]);

  const usersWithStories = [];
  for (let story of stories) {
    if (story.stories && story.stories.length > 0) {
      usersWithStories.push(story);
    }
  }

  let sortDataOnBasisOfStories = (inputArray) => {
    let len = inputArray.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (
          inputArray[j].stories[inputArray[j].stories.length - 1].createdAt <
          inputArray[j + 1].stories[inputArray[j + 1].stories.length - 1]
            .createdAt
        ) {
          let tmp = inputArray[j];
          inputArray[j] = inputArray[j + 1];
          inputArray[j + 1] = tmp;
        }
      }
    }
    return inputArray;
  };

  const updatedArray = sortDataOnBasisOfStories(usersWithStories);

  function isInArray(value, array) {
    const result = array.find((id) => id == value);
    return result;
  }
  let showStoryCircle = false;
  let filterStories = [];
  for (let story of updatedArray) {
    showStoryCircle = false;
    if (story.stories && story.stories.length > 0) {
      const totalStoriesCount = story.stories.length;
      let viewedStoriesCount = 0;
      story.stories.map((singleStory) => {
        if (isInArray(userId, singleStory.viewers)) {
          viewedStoriesCount = viewedStoriesCount + 1;
        }
      });
      if (viewedStoriesCount < totalStoriesCount) {
        showStoryCircle = true;
      }
    }
    story = { ...story, showStoryCircle };
    filterStories.push(story);
  }

  const UnreadStoriesData = [];
  for (let i = 0; i < filterStories.length; i++) {
    if (filterStories[i].showStoryCircle) {
      let tempStory = { ...filterStories[i], priority: i + 1 };
      UnreadStoriesData.push(tempStory);
    }
  }

  const ReadStoriesData = [];
  for (let i = 0; i < filterStories.length; i++) {
    if (!filterStories[i].showStoryCircle) {
      let tempStory = { ...filterStories[i], priority: i + 1 };
      ReadStoriesData.push(tempStory);
    }
  }

  const myStories = await Story.find({
    $and: [
      { userId: { $eq: mongoose.Types.ObjectId(userId) } },
      { createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
    ],
  });
  return res.status(200).send({
    stories: { UnreadStoriesData, ReadStoriesData },
    myStories: myStories,
  });
};

exports.addStory = async (req, res, next) => {
  const { error } = validateStory(req.body);
  if (error) {
    return res.status("400").send(error.details[0].message);
  }
  const { userId } = req.body;

  let story = new Story({
    userId,
  });

  if (req.file) {
    const { destination, filename } = req.file;
    if (isImage(req.file.mimetype)) {
      story.image = utils.createImageUrl(destination, filename);
    } else if (isVideo(req.file.mimetype)) {
      story.video = utils.createVideoUrl(destination, filename);
    }
  }
  const result = await story.save();

  return res.status(200).send(result);
};

exports.viewedStory = async (req, res, next) => {
  const { userId, storyId } = req.query;

  const result = await Story.update(
    { _id: storyId },
    { $push: { viewers: userId } }
  );

  return res.status(200).send(result);
};
