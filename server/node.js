const express = require('express');
const paystack = require('paystack')(process.env.PAYSTACK_SECRET);
const router = express.Router();
const Wallet = require('../models/Wallet');
const Order = require('../models/Order');

// Initialize payment
router.post('/payments/pay', async (req, res) => {
  const { email, amount, orderId } = req.body;
  const transaction = await paystack.transaction.initialize({
    email,
    amount: amount * 100,
    callback_url: `${process.env.FRONTEND_URL}/api/payments/verify?orderId=${orderId}`
  });
  res.json(transaction);
});

// Verify payment
router.get('/payments/verify', async (req, res) => {
  const { reference, orderId } = req.query;
  const verify = await paystack.transaction.verify(reference);
  if (verify.data.status === 'success') {
    if(orderId){
      await Order.findByIdAndUpdate(orderId, { status: 'paid' });
    } else {
      await Wallet.findOneAndUpdate({ user: req.user.id }, { $inc: { balance: verify.data.amount/100 } });
    }
  }
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});

module.exports = router;
