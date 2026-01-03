// cartService.js
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { deleteDoc, increment, updateDoc } from "firebase/firestore";

/**
 * Add a product to the user's cart in Firestore
 * If the product already exists, increment its quantity
 */
export async function addToCart(userId, product) {
  if (!userId) return;
   
  const cartItemId = product.size ? `${product.id}-${product.size}` : product.id;
  const cartRef = doc(db, "users", userId, "cart", cartItemId);
  const snapshot = await getDoc(cartRef);

 if (snapshot.exists()) {
  await updateDoc(cartRef, {
    quantity: increment(product.quantity || 1)
  });
} else {
    // Product not in cart → create new document
    await setDoc(cartRef, {
      id: product.id,
      title: product.title,
      price: Number(product.price), // ensure it's a number
      quantity: product.quantity,
      image: product.image || "",
      size: product.size || null,
    });
  }
}

/**
 * Fetch all cart items for a given user
 * Returns an array of cart items with id, title, price, quantity, image
 */
export async function fetchUserCart(userId) {
  if (!userId) return [];

  const cartRef = collection(db, "users", userId, "cart");
  const snapshot = await getDocs(cartRef);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}




export async function deleteCartItem(userId, Id) {
  if (!userId) return;


  const cartRef = doc(db, "users", userId, "cart", Id);
  await deleteDoc(cartRef);
}


export async function updateCartQuantity(userId, item, newQuantity) {
  if (!userId) return;

  const cartItemId = item.size
    ? `${item.id}-${item.size}`
    : item.id;

  const cartRef = doc(db, "users", userId, "cart", cartItemId);

  await updateDoc(cartRef, {
    quantity: newQuantity
  });
}