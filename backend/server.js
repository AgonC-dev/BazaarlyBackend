// backend/server.js
const result = require('dotenv').config();

if (result.error) {
  console.error("❌ Dotenv Error:", result.error);
} else {
  console.log("✅ Variables Loaded:", Object.keys(result.parsed || {}));
}

console.log("Checking specific key:", process.env.FIREBASE_SERVICE_ACCOUNT ? "FOUND" : "NOT FOUND");
const express = require('express');
const cors = require('cors');
const { fetchProducts, fetchProductById } = require('./fetchProducts.js');

const app = express();
app.use(cors({
  origin: 'https://bazaarly-backend.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Endpoint to fetch products
app.get('/products', async (req, res) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
});

// endpoint to fetch product
app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id; // Grabs the ID from the URL
    const product = await fetchProductById(productId);
    
    if (!product) {
      return res.status(404).send('Product not found');
    }
    
    res.json(product);
  } catch (err) {
    res.status(500).send('Error fetching product');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
