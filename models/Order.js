const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title'],
  },
  brand: {
    type: String,
    required: [true, 'Please add a description'],
  },

  taxPrice: {
    type: Number,
    required: [true, 'Please add the price'],
  },
  itemsPrice: {
    type: Number,
    required: [true, 'Please add the price'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please add the price'],
  },
  shippingPrice: {
    type: Number,
    required: [true, 'Please add the price'],
  },

  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
  shipping: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shipping',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Product', OrderSchema);
