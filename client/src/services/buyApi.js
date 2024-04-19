import Cookies from "js-cookie";

export async function handleBuy(userId, productId) {
  try {
    await fetch(`http://127.0.0.1:5000/api/v1/products/${productId}/bought`, {
      method: "POST",
      body: JSON.stringify({ product: productId, user: userId }),
      headers: {
        Authorization: Cookies.get("jwt"),
      },
    });
  } catch (err) {
    console.log(err.message);
  }
}

export async function getMyBought() {
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/v1/users/myBought`, {
      method: "GET",
      headers: {
        Authorization: Cookies.get("jwt"),
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
