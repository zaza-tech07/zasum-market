const axios = require("axios");

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;

// Create recipient
exports.createRecipient = async ({ name, account_number, bank_code }) => {
  const res = await axios.post("https://api.paystack.co/transferrecipient", {
    type: "nuban",
    name,
    account_number,
    bank_code,
    currency: "NGN"
  }, { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } });

  return res.data.data;
};

// Initiate transfer
exports.initiateTransfer = async ({ amount, recipient_code, reason }) => {
  const res = await axios.post("https://api.paystack.co/transfer", {
    source: "balance",
    amount,
    recipient: recipient_code,
    reason
  }, { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } });

  return res.data.data;
};