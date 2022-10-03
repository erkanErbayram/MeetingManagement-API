const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  companies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
});
module.exports = Product = mongoose.model("product", ProductSchema);
