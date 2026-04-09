const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { getAllUsers, getAllWithdrawals } = require("../controllers/adminController");

// Admin: get all users
router.get("/users", auth, role("admin"), getAllUsers);

// Admin: get all withdrawal requests
router.get("/withdrawals", auth, role("admin"), getAllWithdrawals);

module.exports = router;