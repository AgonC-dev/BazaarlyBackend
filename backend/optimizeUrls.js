const fs = require('fs');
const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

const fixedProducts = products.map(p => {
  // 1. Fix Unsplash Images
  if (p.image.includes('unsplash.com')) {
    const baseUrl = p.image.split('?')[0];
    // Force tiny width (400px), low quality (60), and WebP format
    p.image = `${baseUrl}?w=400&q=60&fm=webp&fit=crop`;
  }

  // 2. Fix GitHub Raw Images (GitHub doesn't compress, so we use a Proxy)
  // We use wsrv.nl - a free, fast, open-source image resizer
  if (p.image.includes('raw.githubusercontent.com')) {
    p.image = `https://wsrv.nl/?url=${p.image}&w=400&q=60&output=webp`;
  }

  return p;
});

fs.writeFileSync('products.json', JSON.stringify(fixedProducts, null, 2));
console.log("🚀 EMERGENCY COMPRESSION COMPLETE!");
console.log("Next: Run 'node import.js' to update your database.");