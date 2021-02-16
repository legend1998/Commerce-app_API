const mongoose = require("mongoose");

const OrderModel = new mongoose.Schema({
  totalAmount: { type: Number, required: true },
  products: { type: [Object], required: true },
  orderedby: { type: String, required: true },
  paymentStatus: { type: String, required: true, default: "not proceeded" },
  fulfilled: { type: Boolean, default: false },
  shipdate: { type: Date },
});

const Orders = mongoose.model("Orders", OrderModel);

module.exports = Orders;
