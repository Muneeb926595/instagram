const express = require("express");
const router = express.Router();

const notificationsController = require("../../controllers/notifications/notifications");
const auth = require("../../middleware/auth");

router.get("/notification", auth, notificationsController.getNotifications);
router.put(
  "/notification/:id",
  auth,
  notificationsController.updateNotification
);
router.put("/toggleNotification", notificationsController.toggleNotification);
router.delete("/delete-notification/:id", notificationsController.deleteNotification);
module.exports = router;
