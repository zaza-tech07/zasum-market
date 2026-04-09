const cron = require("node-cron");
const Escrow = require("../models/Escrow");
const Order = require("../models/Order");
const { creditWallet } = require("../controllers/walletController");

cron.schedule("0 0 * * *", async () => {
  const escrows = await Escrow.find({ status: "holding" }).populate("order");

  for (let esc of escrows) {
    const days = (Date.now() - esc.createdAt) / (1000 * 60 * 60 * 24);

    if (days > 3) {
      esc.status = "released";
      await esc.save();

      await creditWallet(esc.seller, esc.amount);

      await Order.findByIdAndUpdate(esc.order._id, {
        status: "completed"
      });
    }
  }

  console.log("Auto escrow release checked");
});