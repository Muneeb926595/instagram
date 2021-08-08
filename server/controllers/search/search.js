const { User } = require("../../models/auth/user");

exports.searchUsers = async (req, res, next) => {
  const { searchText } = req.query;

  var Value_match = new RegExp(searchText, "i");

  const users = await User.aggregate([
    {
      $match: {
        $or: [{ userName: { $regex: Value_match } }],
      },
    },
    {
      $project: {
        userName: 1,
        email: 1,
        image: 1,
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  return res.status(200).send({ users });
};
