export async function fetchProducts() {
  const res = await fetch("http://localhost:3000/products");

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  return res.json();
}


export async function fetchProduct({ id }) {
  const res = await fetch(`http://localhost:3000/products/${id}`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  return res.json();
}
