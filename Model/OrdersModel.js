const mongoose = require("mongoose");

const OrderModel = new mongoose.Schema({
  oid: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  products: { type: [Object], required: true },
  paymentStatus: { type: String, default: "not proceeded" },
  fulfilled: { type: Boolean, default: false },
  shipdate: { type: Date },
});

const Orders = mongoose.model("Orders", OrderModel);

module.exports = Orders;
