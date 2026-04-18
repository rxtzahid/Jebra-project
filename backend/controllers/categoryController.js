const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res, next) => {
  try {
    const { name, icon, description } = req.body;
    
    // Create slug from name
    const slug = name.toLowerCase().replace(/ /g, '-');
    
    const category = await Category.create({
      name,
      icon: icon || '📱',
      slug,
      description: description || '',
    });
    
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, createCategory };