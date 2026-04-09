const router = require("express").Router();
const auth = require("../middleware/auth");
const { createProduct, getProducts } = require("../controllers/productController");

// Create product
router.post("/", auth, createProduct);

// Get all products
router.get("/", getProducts);

module.exports = router;