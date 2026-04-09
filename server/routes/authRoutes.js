const router = require("express").Router();
const { registerUser, loginUser, getMe } = require("../controllers/authController");
const auth = require("../middleware/auth");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get current user
router.get("/me", auth, getMe);

module.exports = router;