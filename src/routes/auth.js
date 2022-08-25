const express = require("express");
const router = express.Router();

// controller
const authController = require("../app/controllers/AuthController");

// router
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/", authController.showAll);

module.exports = router;
