const express = require('express');
const { getCategories, createCategory } = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// Get all categories (public)
router.get('/', getCategories);

// Create category (admin only)
router.post('/', protect, admin, createCategory);

module.exports = router;