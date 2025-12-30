const API_URL = import.meta.env.VITE_API_URL; // <-- use this

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json();
}

export async function fetchProduct({ id }) {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);
  return res.json();
}
