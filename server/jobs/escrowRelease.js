const cron = require("node-cron");
const Order = require("../models/Order");
const { creditWallet } = require("../utils/wallet");

cron.schedule("0 * * * *", async () => {
  const orders = await Order.find({
    status: "delivered",
    deliveredAt: { $lte: new Date(Date.now() - 3*24*60*60*1000) }
  });

  for(let order of orders){
    await creditWallet(order.seller, order.amount, "escrow_release", "Auto escrow release");
    order.status = "completed";
    await order.save();
  }

  console.log("Escrow auto-release executed");
});