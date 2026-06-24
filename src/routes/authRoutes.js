const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const {
  isAuthenticated,
} = require("../middleware/authMiddleware");

const profile = require("../controllers/getLoggedIn");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get(
  "/profile",
  isAuthenticated,
  profile
);

module.exports = router;