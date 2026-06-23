const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {registerUser  , loginUser }= require("../controllers/authController.js");



router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);





module.exports = router;