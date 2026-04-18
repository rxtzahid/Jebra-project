const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add product name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add price'],
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    image: {
      type: String,
      required: [true, 'Please add image URL'],
    },
    category: {
      type: String,
      required: [true, 'Please select category'],
      enum: ['phone', 'laptop', 'watch'],
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock quantity'],
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;