const axios = require("axios");
const Order = require("../models/Order");
const User = require("../models/User");

exports.pay = async (req, res) => {
  const { email, amount } = req.body;

  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    { email, amount: amount * 100 },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
      }
    }
  );

  res.json(response.data);
};

exports.verify = async (req, res) => {
  const { reference, orderId } = req.body;

  const verify = await axios.get(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
      }
    }
  );

  if (verify.data.data.status === "success") {
    const order = await Order.findById(orderId);
    const seller = await User.findById(order.seller);

    seller.wallet.pendingBalance += order.amount;
    order.status = "paid";

    await seller.save();
    await order.save();
  }

  res.json("Payment verified");
};
const {
  initializePayment,
  verifyPayment
} = require("../utils/paystack");

const data = await initializePayment({
  email: user.email,
  amount: order.amount,
  reference: "ZASUM_" + Date.now()
});

res.json(data.authorization_url);

const paymentData = await verifyPayment(reference);

if (paymentData.status === "success") {
  // Move money to escrow
}

const crypto = require("crypto");
const Escrow = require("../models/Escrow");
const Order = require("../models/Order");

exports.webhook = async (req, res) => {
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.sendStatus(401);
  }

  const event = req.body;

  if (event.event === "charge.success") {
    const data = event.data;

    const order = await Order.findById(data.metadata.orderId);

    order.status = "paid";
    await order.save();

    // CREATE ESCROW
    await Escrow.create({
      order: order._id,
      buyer: order.buyer,
      seller: order.seller,
      amount: order.amount
    });
  }

  res.sendStatus(200);
};