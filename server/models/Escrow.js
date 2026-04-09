const mongoose = require("mongoose");

const escrowSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  status: {
    type: String,
    enum: ["holding", "released", "refunded"],
    default: "holding"
  }
}, { timestamps: true });

module.exports = mongoose.model("Escrow", escrowSchema);