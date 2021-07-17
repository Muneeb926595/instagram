const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");

const { isImage, isVideo } = require("../../utils");
const auth = require("../../middleware/auth");
const sotryController = require("../../controllers/stories/stories");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    let path;
    if (isImage(file.mimetype)) {
      path = "./public/uploads/" + req.user._id + "/";
    } else if (isVideo(file.mimetype)) {
      path = "./public/uploads/videos/" + req.user._id + "/";
    }

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    callback(null, path);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, " ") + "-" + file.originalname
    );
  },
});

const upload = multer({
  storage: storage,

  fileFilter(req, file, cb) {
    if (!isImage(file.mimetype) && !isVideo(file.mimetype)) {
      cb(new Error("only upload files with jpg or jpeg format."));
    }
    cb(undefined, true);
  },
});

router.post(
  "/story",
  auth,
  upload.single("imageFile"),
  sotryController.addStory
);
router.get("/story", auth, sotryController.getStories);
router.put("/viewed-story", auth, sotryController.viewedStory);

module.exports = router;
