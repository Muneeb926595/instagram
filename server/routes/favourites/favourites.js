const express = require("express");
const router = express.Router();

const favouritesController = require("../../controllers/favourites/favourites");
const auth = require("../../middleware/auth");

router.post("/favourites", auth, favouritesController.addToFavourite);
router.get("/favourites/:userId", auth, favouritesController.getFavourites);
module.exports = router;
