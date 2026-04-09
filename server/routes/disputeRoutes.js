const router = require("express").Router();
const auth = require("../middleware/auth");
const { createDispute, getUserDisputes, resolveDispute } = require("../controllers/disputeController");
const role = require("../middleware/role");

// Create dispute
router.post("/", auth, createDispute);

// Get disputes for user
router.get("/", auth, getUserDisputes);

// Admin resolves dispute
router.put("/:id/resolve", auth, role("admin"), resolveDispute);

module.exports = router;