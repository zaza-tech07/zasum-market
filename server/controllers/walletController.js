const User = require("../models/User");
const { createRecipient, initiateTransfer } = require("../utils/paystack");

// ✅ Get Wallet
exports.getWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.wallet);

  } catch (error) {
    console.error("Get Wallet Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Withdraw Money
exports.withdraw = async (req, res) => {
  try {
    const { amount, account_number, bank_code, name } = req.body;

    // 🔍 Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    if (!account_number || !bank_code || !name) {
      return res.status(400).json({
        message: "Bank details are required"
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 💰 Check balance
    if (user.wallet.availableBalance < amount) {
      return res.status(400).json({
        message: "Insufficient funds"
      });
    }

    // 🏦 Create Paystack recipient
    const recipient = await createRecipient({
      name,
      account_number,
      bank_code
    });

    // 💸 Initiate transfer
    await initiateTransfer({
      amount: amount * 100, // Paystack uses kobo
      recipient_code: recipient.recipient_code,
      reason: "ZASUM withdrawal"
    });

    // ➖ Deduct balance AFTER successful transfer
    user.wallet.availableBalance -= amount;
    await user.save();

    res.json({
      message: "Withdrawal successful"
    });

  } catch (error) {
    console.error("Withdraw Error:", error);
    res.status(500).json({
      message: "Withdrawal failed",
      error: error.message
    });
  }
};

const Withdrawal = require("../models/Withdrawal");

exports.requestWithdrawal = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user.wallet < req.body.amount)
    return res.status(400).json({ msg: "Insufficient funds" });

  await Withdrawal.create({
    user: user._id,
    amount: req.body.amount
  });

  res.json({ msg: "Withdrawal pending approval" });
};

exports.approveWithdrawal = async (req, res) => {
  const withdrawal = await Withdrawal.findById(req.params.id);

  withdrawal.status = "approved";
  await withdrawal.save();

  res.json({ msg: "Withdrawal approved (send money manually or via API)" });
};