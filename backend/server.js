// backend/server.js
require('dotenv').config();

// Logging environment status for debugging in Railway logs
console.log("--- Environment Status ---");
console.log("Checking FIREBASE_SERVICE_ACCOUNT:", process.env.FIREBASE_SERVICE_ACCOUNT ? "FOUND ✅" : "NOT FOUND ❌");
console.log("Running on Port:", process.env.PORT || 3000);
console.log("--------------------------");

const express = require('express');
const cors = require('cors');
const { fetchProducts, fetchProductById } = require('./fetchProducts.js');

const app = express();

// CORS Configuration
// This allows your specific Vercel frontend and your local development environment
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://bazaarly.xyz',
    'https://www.bazaarly.xyz',
  ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 1. Root Health Check (Use this to verify if the 502 error is fixed)
app.get('/', (req, res) => {
  res.send('Bazaarly Backend is Running Successfully!');
});

// 2. Endpoint to fetch all products
app.get('/products', async (req, res) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (err) {
    console.error("Error in /products route:", err);
    res.status(500).send('Error fetching products');
  }
});

// 3. Endpoint to fetch a single product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await fetchProductById(productId);
    
    if (!product) {
      return res.status(404).send('Product not found');
    }
    
    res.json(product);
  } catch (err) {
    console.error(`Error in /products/${req.params.id} route:`, err);
    res.status(500).send('Error fetching product');
  }
});

// Port Configuration
const PORT = process.env.PORT || 3000;

// Listen on 0.0.0.0 is essential for Railway to route traffic correctly
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is officially running on port ${PORT}`);
});