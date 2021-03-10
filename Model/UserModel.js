const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date_joined: { type: Date, required: true, default: Date.now() },
    phone: {
      type: String,
      required: true,
      maxlength: 10,
      minlength: 10,
      unique: true,
    },
    address: { type: [Object], maxlength: 2 },
    role: { type: String, default: "user" },
    cart: { type: [Object] },
    refCode: { type: String, required: true, unique: true },
    refBy: { type: String, required: false, default: "" },
    coupans: { type: [Object] },
    wishlist: { type: [Object] },
    orders: { type: [Object] },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", UserModel);

module.exports = User;
