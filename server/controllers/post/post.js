const utils = require("../../utils");
const mongoose = require("mongoose");
const { isImage, isVideo } = require("../../utils");
const { Post } = require("../../models/post/post");

exports.getAllPosts = async (req, res, next) => {
  let posts = await Post.aggregate([
    {
      $lookup: {
        from: "likes",
        as: "likes",
        let: { postId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$postId", "$$postId"] },
            },
          },
          {
            $lookup: {
              from: "users",
              as: "userId",
              let: { userId: "$userId" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$userId"] },
                  },
                },
                { $project: { fullName: 1, userName: 1, email: 1, image: 1 } },
              ],
            },
          },
          { $sort: { createdAt: -1 } },
          { $unwind: "$userId" },
        ],
      },
    },
    {
      $lookup: {
        from: "favourites",
        as: "favourites",
        let: { postId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$postId", "$$postId"] },
            },
          },
          {
            $lookup: {
              from: "users",
              as: "userId",
              let: { userId: "$userId" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$userId"] },
                  },
                },
                { $project: { fullName: 1, userName: 1, email: 1, image: 1 } },
              ],
            },
          },
          { $sort: { createdAt: -1 } },
          { $unwind: "$userId" },
        ],
      },
    },
    {
      $addFields: {
        favourites: {
          $size: "$favourites",
        },
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$userId"] },
            },
          },
          { $project: { fullName: 1, userName: 1, email: 1, image: 1 } },
        ],
        as: "users",
      },
    },
    {
      $addFields: {
        userId: {
          $arrayElemAt: ["$users", 0],
        },
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  let likes;
  let likeCounts = 0;
  const filterPosts = [];
  for (const post of posts) {
    likes = [];
    likeCounts = 0;
    if (post.likes && post.likes.length > 0) {
      likes = post.likes.filter((like) => {
        return like.like === true;
      });
      likeCounts = likes.length;
    }
    filterPosts.push({
      ...post,
      likes: { count: likeCounts, likes: likes },
    });
  }

  return res.status(200).send({
    posts: filterPosts,
  });
};

exports.addPost = async (req, res, next) => {
  const { userId, mediaFiles } = req.body;

  let post = new Post({
    userId,
    mediaFiles: JSON.parse(mediaFiles),
  });

  const result = await post.save();
  return res.status(200).send(result);
};

exports.getUserPosts = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const id = req.params.id;

  const posts = await Post.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "likes",
        as: "likes",
        let: { postId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$postId", "$$postId"] },
            },
          },
          {
            $lookup: {
              from: "users",
              as: "userId",
              let: { userId: "$userId" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$userId"] },
                  },
                },
                { $project: { fullName: 1, userName: 1, email: 1, image: 1 } },
              ],
            },
          },
          { $sort: { createdAt: -1 } },
          { $unwind: "$userId" },
        ],
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$userId"] },
            },
          },
          { $project: { fullName: 1, userName: 1, email: 1, image: 1 } },
        ],
        as: "users",
      },
    },
    {
      $addFields: {
        userId: {
          $arrayElemAt: ["$users", 0],
        },
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  let likes;
  let likeCounts = 0;
  const filterPosts = [];
  for (const post of posts) {
    likes = [];
    likeCounts = 0;
    if (post.likes && post.likes.length > 0) {
      likes = post.likes.filter((like) => {
        return like.like === true;
      });
      likeCounts = likes.length;
    }

    filterPosts.push({
      ...post,
      likes: { count: likeCounts, likes: likes },
    });
  }
  return res.status(200).send(filterPosts);
};
