const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    required: [true, 'Please add a description'],
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);
