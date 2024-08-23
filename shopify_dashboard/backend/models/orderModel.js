const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Number,
  email: String,
  created_at: Date,
  updated_at: Date,
  total_price: String,
  subtotal_price: String,
  total_tax: String,
  currency: String,
  financial_status: String,
  customer: {
    id: mongoose.Schema.Types.Number,
    email: String,
    first_name: String,
    last_name: String,
    orders_count: Number,
    total_spent: String,
  },
  line_items: [
    {
      id: mongoose.Schema.Types.Number,
      title: String,
      quantity: Number,
      price: String,
    },
  ],
});

module.exports = mongoose.model('Order', orderSchema, 'shopifyOrders');
