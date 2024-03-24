// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../Models/productDataModel');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    // console.log(products)

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
