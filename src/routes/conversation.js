const express = require("express");
const router = express.Router();

// controller
const conversationController = require("../app/controllers/ConversationController");

// router
router.get(
  "/find/:firstUserId/:secondUserId",
  conversationController.findOnlineFriendChat
);
router.get("/:userId", conversationController.getAConversationWithUserId);
router.post("/", conversationController.create);
router.get("/", conversationController.showAll);

module.exports = router;
