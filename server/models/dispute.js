const mongoose = require("mongoose");

const disputeSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  reason: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["open","resolved","rejected"], default: "open" }
}, { timestamps: true });

module.exports = mongoose.model("Dispute", disputeSchema);