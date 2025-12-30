// backend/server.js
const express = require('express');
const cors = require('cors');
const { fetchProducts, fetchProductById } = require('./fetchProducts.js');

const app = express();
app.use(cors());
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
