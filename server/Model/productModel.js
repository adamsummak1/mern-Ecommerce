const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "a product must have a title"],
  },
  description: {
    type: String,
    minLength: [20, "a product description must me more than 20 charactor"],
  },
  price: {
    type: Number,
    required: [true, "a product must have a price"],
  },
  images: {
    type: [String],
    required: [true, "a post must have a images"],
  },
  priceDiscount: Number,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
