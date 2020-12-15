const mongoose = require("mongoose");

const PaymentModel = new mongoose.Schema({
  tid: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  paymentSuccess: { type: Boolean, default: false },
  payementDate: { type: Date, default: Date.now() / 1000 },
});

const Payments = mongoose.model("payments", PaymentModel);

module.exports = Payments;
