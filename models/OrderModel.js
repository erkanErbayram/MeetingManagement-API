const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  companies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
  },
  product: [
    {
      products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  meetingRoom: {
    type: String,
  },
});
module.exports = Order = mongoose.model("order", OrderSchema);
