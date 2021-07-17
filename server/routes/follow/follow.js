const express = require("express");
const router = express.Router();

const followController = require("../..//controllers/follow/follow");
const auth = require("../../middleware/auth");

router.post("/followUnFollow", auth, followController.followUnfollow);
router.get("/followings/:id", auth, followController.userFollowingsList);
router.post(
  "/removeFollowerFollowing",
  auth,
  followController.removeFollowerFollowing
);

module.exports = router;
