const express = require("express");
const router = express.Router();

// controller
const userController = require("../app/controllers/UserController");

// router
router.put("/:id/unfollow", userController.unfollow);
router.put("/:id/follow", userController.follow);
router.get("/friends/:userId", userController.getFriends);
router.delete("/:id", userController.delete);
router.put("/:id", userController.update);
router.get("/", userController.findById);
router.get("/", userController.showAll);

module.exports = router;
