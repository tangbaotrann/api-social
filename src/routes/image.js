const express = require("express");
const router = express.Router();

const imageController = require("../app/controllers/ImageController");

// router
router.get("/:image", imageController.show);

module.exports = router;
