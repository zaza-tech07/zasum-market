const router = require("express").Router();
const auth = require("../middleware/auth");
const { createOrder, markDelivered } = require("../controllers/orderController");

// Create order (buyer)
router.post("/", auth, createOrder);

// Mark delivered (buyer or seller)
router.put("/:id/deliver", auth, markDelivered);

module.exports = router;