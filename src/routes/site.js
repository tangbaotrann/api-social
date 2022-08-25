const express = require("express");
const router = express.Router();

// controller
const siteController = require("../app/controllers/SiteController");

// router
router.get("/", siteController.home);

module.exports = router;
