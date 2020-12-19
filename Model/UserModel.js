const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date_joined: { type: Date, required: true, default: new Date() },
  phone: { type: String, required: true, maxlength: 10, unique: true },
  address: { type: [Object], maxlength: 2 },
  role: { type: String, required: true, default: "user" },
  cart: { type: [Object] },
  wishlist: { type: [Object] },
  orders: { type: [Object] },
});

const User = mongoose.model("Users", UserModel);

module.exports = User;
