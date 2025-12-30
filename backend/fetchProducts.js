// backend/fetchProducts.js
const { db } = require('./firebase.js');

async function fetchProducts() {
  console.log("1. Entering fetchProducts function");
  try {
    const snapshot = await db.collection('products').get();
    console.log("2. Firestore data received!");
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("3. Firestore Error:", error);
    throw error;
  }
}

async function fetchProductById(id) {
  const doc = await db.collection('products').doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

module.exports = { fetchProducts, fetchProductById };
