import Cookies from "js-cookie";

export async function isLoggedIn() {
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/v1/users/isLoggedIn`, {
      headers: {
        Authorization: Cookies.get("jwt"),
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function signUser({ formData, isLogin }) {
  try {
    const res = await fetch(
      `http://127.0.0.1:5000/api/v1/users/${isLogin ? "login" : "signup"}`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (data.state === "success") {
      Cookies.set("jwt", `Bearer ${data.token}`, { expires: 30 });
    }
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
