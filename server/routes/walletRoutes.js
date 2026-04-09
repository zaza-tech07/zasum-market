const router = require("express").Router();
const auth = require("../middleware/auth");
const { getWallet } = require("../controllers/walletController");

// Get wallet balance
router.get("/", auth, getWallet);

module.exports = router;