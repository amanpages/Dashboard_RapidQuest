const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Number,
  email: String,
  created_at: Date,
  updated_at: Date,
  first_name: String,
  last_name: String,
  orders_count: Number,
  total_spent: String,
  last_order_id: mongoose.Schema.Types.Number,
  default_address: {
    id: mongoose.Schema.Types.Number,
    customer_id: mongoose.Schema.Types.Number,
    first_name: String,
    last_name: String,
    city: String,
    province: String,
    country: String,
    zip: String,
    default: Boolean,
  },
});

module.exports = mongoose.model('Customer', customerSchema, 'shopifyCustomers');
