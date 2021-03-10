const mongoose = require("mongoose");

const coupanSchema = new mongoose.Schema({
  coupanCode: { type: String, unique: true, required: true },
  usedBy: { type: String, default: "" },
});

const coupans = mongoose.model("coupans", coupanSchema);

module.exports = coupans;
