const router = require("express").Router();
const auth = require("../middleware/auth");
const { requestWithdrawal, approveWithdrawal } = require("../controllers/withdrawalController");
const role = require("../middleware/role");

// User requests withdrawal
router.post("/", auth, requestWithdrawal);

// Admin approves withdrawal
router.put("/:id/approve", auth, role("admin"), approveWithdrawal);

module.exports = router;