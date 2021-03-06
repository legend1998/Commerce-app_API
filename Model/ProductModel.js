const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    pid: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    offer_price: { type: Number, required: true },
    sell_price: { type: Number, required: true },
    category: { type: [String], required: true },
    description: { type: String, required: true },
    rating: { type: String },
    tags: { type: [String] },
    color: { type: String, required: true },
    thumbnailURL: { type: String, required: true, unique: true },
    imageURL: { type: [String], required: true, unique: true },
    group: { type: String, required: true },
    quantity: { type: Number, required: true },
    details: { type: [Object], required: true },
    reviews: { type: [Object] },
    seller: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now() },
    featured: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
