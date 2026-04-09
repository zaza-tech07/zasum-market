const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  amount: Number,

  status: {
    type: String,
    enum: ["pending", "paid", "delivered", "completed", "disputed"],
    default: "pending"
  }
});

module.exports = mongoose.model("Order", orderSchema);