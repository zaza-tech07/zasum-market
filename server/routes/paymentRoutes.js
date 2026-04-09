const router = require("express").Router();
const { pay, verify } = require("../controllers/paymentController");

router.post("/pay", pay);
router.post("/verify", verify);

module.exports = router;

router.post("/webhook", express.json(), webhook);