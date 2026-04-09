const Escrow = require("../models/Escrow");
const { creditWallet } = require("./walletController");

exports.confirmDelivery = async (req, res) => {
  const order = await Order.findById(req.params.id);
  const escrow = await Escrow.findOne({ order: order._id });

  if (!escrow) return res.status(400).json({ msg: "No escrow found" });

  escrow.status = "released";
  await escrow.save();

  order.status = "completed";
  await order.save();

  // PAY SELLER
  await creditWallet(order.seller, order.amount);

  res.json({ msg: "Funds released to seller" });
};