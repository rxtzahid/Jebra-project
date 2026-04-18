const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// Public routes (সবাই দেখতে পারে)
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin routes (শুধু admin পারে)
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;