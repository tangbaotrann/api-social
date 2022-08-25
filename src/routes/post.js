const express = require("express");
const router = express.Router();

// controller
const postController = require("../app/controllers/PostController");

// router
router.get("/profile/:username", postController.getUserAllPost);
router.get("/timeline/:userId", postController.timeline);
router.put("/:id/like", postController.like);
router.delete("/:id", postController.delete);
router.put("/:id", postController.update);
router.get("/:id", postController.getAPost);
router.post("/", postController.create);
router.get("/", postController.showAll);

module.exports = router;
