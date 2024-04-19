export async function fetchProducts() {
  const res = await fetch("http://127.0.0.1:5000/api/v1/products");
  const data = await res.json();
  return data;
}

export async function getProduct(id) {
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/v1/products/${id}`);

    const data = res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
