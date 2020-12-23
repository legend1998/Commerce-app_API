const mongoose = require("mongoose");

const PaymentModel = new mongoose.Schema(
  {
    tid: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    paymentSuccess: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Payments = mongoose.model("payments", PaymentModel);

module.exports = Payments;
