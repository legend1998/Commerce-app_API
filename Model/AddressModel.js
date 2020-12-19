const mongoose = require("mongoose");

const AddressModel = new mongoose.Schema({
  street: { type: String, required: true },
  house: { type: String, required: true },
  Landmark: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pin_code: { type: String, required: true, minlength: 6, maxlength: 6 },
});

const Address = mongoose.model("address", AddressModel);

module.exports = Address;
