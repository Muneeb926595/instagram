const express = require("express");
const router = express.Router();

const likesController = require("../../controllers/likes/likes");
const auth = require("../../middleware/auth");

router.post("/likes", auth, likesController.addLike);
module.exports = router;
