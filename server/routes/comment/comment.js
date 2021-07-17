const express = require("express");
const router = express.Router();

const commentController = require("../../controllers/comment/comment");
const auth = require("../../middleware/auth");

router.get("/comments/:id", auth, commentController.getComments);
router.post("/comments", auth, commentController.addComment);
router.put("/comments/:id", auth, commentController.updateComment);
router.delete("/comments/:id", auth, commentController.deleteComment);

module.exports = router;
