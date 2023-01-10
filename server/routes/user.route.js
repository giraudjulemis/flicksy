const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

router
  .route("/profile")
  .get(auth("readOwn", "profile"), userController.getProfile)
  .patch(auth("updateOwn", "profile"), userController.updateProfile);

module.exports = router;
