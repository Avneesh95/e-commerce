const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const profile = require("../controllers/getLoggedIn.js");

const {registerUser  , loginUser }= require("../controllers/authController.js");



router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, profile);





module.exports = router;