const router = require("express").Router();
const auth = require("../middleware/auth");
const { getUsers, getUserById } = require("../controllers/userController");

// Admin: get all users
router.get("/", auth, getUsers);

// Get single user
router.get("/:id", auth, getUserById);

module.exports = router;