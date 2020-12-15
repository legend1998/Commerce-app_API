const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema({
  category: { type: String, unique: true },
});

const category = mongoose.model("category", categoryModel);

module.exports = category;
