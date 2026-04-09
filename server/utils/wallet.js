const Transaction = require("../models/Transaction");

exports.creditWallet = async (userId, amount, category, description) => {
  return await Transaction.create({
    user: userId,
    type: "credit",
    amount,
    category,
    description,
    status: "success"
  });
};

exports.debitWallet = async (userId, amount, category, description) => {
  return await Transaction.create({
    user: userId,
    type: "debit",
    amount,
    category,
    description,
    status: "success"
  });
};

exports.getWalletBalance = async (userId) => {
  const credits = await Transaction.aggregate([
    { $match: { user: userId, type: "credit", status: "success" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const debits = await Transaction.aggregate([
    { $match: { user: userId, type: "debit", status: "success" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  return (credits[0]?.total || 0) - (debits[0]?.total || 0);
};