const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["credit","debit"], required: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    enum: ["payment","escrow_hold","escrow_release","withdrawal","refund"]
  },
  status: { type: String, enum: ["pending","success","failed"], default: "pending" },
  reference: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);