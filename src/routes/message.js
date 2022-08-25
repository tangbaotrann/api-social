const express = require("express");
const router = express.Router();

const messageController = require("../app/controllers/MessageController");

// router
router.get("/:conversationId", messageController.getMessageWithConversationId);
router.post("/", messageController.create);
router.get("/", messageController.showAll);

module.exports = router;
