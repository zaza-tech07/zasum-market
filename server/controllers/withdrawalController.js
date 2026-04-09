const Withdrawal = require("../models/Withdrawal");
const { debitWallet } = require("../utils/wallet");
const { createRecipient, initiateTransfer } = require("../utils/paystack");

exports.requestWithdrawal = async (req,res) => {
  try {
    const { amount, account_number, bank_code, name } = req.body;

    const withdrawal = await Withdrawal.create({
      user: req.user.id,
      amount,
      account_number,
      bank_code,
      name
    });

    res.json(withdrawal);
  } catch(err){
    res.status(500).json({ message: err.message });
  }
};

// Admin approves
exports.approveWithdrawal = async (req,res) => {
  try{
    const withdrawal = await Withdrawal.findById(req.params.id);
    if(!withdrawal) return res.status(404).json({ message: "Not found" });

    const recipient = await createRecipient({
      name: withdrawal.name,
      account_number: withdrawal.account_number,
      bank_code: withdrawal.bank_code
    });

    await initiateTransfer({
      amount: withdrawal.amount * 100,
      recipient_code: recipient.recipient_code,
      reason: "ZASUM withdrawal"
    });

    await debitWallet(withdrawal.user, withdrawal.amount, "withdrawal", "User withdrawal");

    withdrawal.status = "approved";
    withdrawal.recipient_code = recipient.recipient_code;
    await withdrawal.save();

    res.json({ message: "Approved" });
  } catch(err){
    res.status(500).json({ message: err.message });
  }
};