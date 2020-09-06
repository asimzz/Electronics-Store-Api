const mongoose = require('mongoose');

const RequestedProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title'],
  },
  image: {
    type: String,
    required: [true, 'Please add a description'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please add the price'],
  },
  price: {
    type: Number,
    required: [true, 'Please add the price'],
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Product', RequestedProductSchema);
