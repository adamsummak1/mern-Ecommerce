const mongoose = require("mongoose");

const boughtSchema = mongoose.Schema({
  product: {
    required: [true, "a buy operation must be to a product"],
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "a buy operation must to from an user"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bought = mongoose.model("Bought", boughtSchema);

module.exports = Bought;
