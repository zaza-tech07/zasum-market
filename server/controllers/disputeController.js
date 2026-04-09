const Dispute = require("../models/Dispute");
const Order = require("../models/Order");

exports.createDispute = async (req, res) => {
  try {
    const { orderId, reason } = req.body;

    // ✅ Validate input
    if (!orderId || !reason) {
      return res.status(400).json({
        message: "Order ID and reason are required"
      });
    }

    // ✅ Check if order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    // ✅ Prevent duplicate disputes (optional but recommended)
    const existingDispute = await Dispute.findOne({ order: orderId });
    if (existingDispute) {
      return res.status(400).json({
        message: "Dispute already exists for this order"
      });
    }

    // ✅ Create dispute
    const dispute = await Dispute.create({
      order: orderId,
      reason,
      createdBy: req.user?.id // if you have auth middleware
    });

    // ✅ Update order status
    order.status = "disputed";
    await order.save();

    res.status(201).json(dispute);

  } catch (error) {
    console.error("Dispute Error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};