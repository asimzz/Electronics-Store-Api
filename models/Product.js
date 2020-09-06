const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a product name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  company: {
    type: String,
    required: [true, 'Please add a company'],
  },
  category: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      'Laptops & PC',
      'Smart Phones',
      'Digital Cameras',
      'Accessories',
      'Other',
    ],
  },
  price: {
    type: Number,
    required: [true, 'Please add the price'],
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  averageRating: {
    type: Number,
    min: [0, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 10'],
    default: 0.0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
