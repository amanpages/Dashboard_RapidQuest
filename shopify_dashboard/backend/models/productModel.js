const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Number,
  title: String,
  product_type: String,
  vendor: String,
  variants: [
    {
      id: mongoose.Schema.Types.Number,
      price: String,
      inventory_quantity: Number,
    },
  ],
});

module.exports = mongoose.model('Product', productSchema, 'shopifyProducts');
