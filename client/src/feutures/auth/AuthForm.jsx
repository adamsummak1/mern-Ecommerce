import { useState } from "react";
import { useLogin } from "./usLogin";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  function reset() {
    setFormData({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  }

  const { mutate, isLoading } = useLogin(formData, isLogin, reset);

  function updateData(e, type) {
    setFormData((prev) => ({ ...prev, [type]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.password === formData.passwordConfirm) {
      mutate();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-100 shadow-header flex flex-col gap-5 p-5 rounded-lg w-[500px]"
    >
      <h1 className="text-4xl text-center font-bold p-1">
        {isLogin ? "Login" : "Signup"}
      </h1>
      {!isLogin && (
        <input
          type="text"
          placeholder="your name"
          value={formData.name}
          required
          className="px-3 py-2 rounded-full shadow-search"
          onChange={(e) => updateData(e, "name")}
        />
      )}
      <input
        type="email"
        placeholder="your email"
        value={formData.email}
        onChange={(e) => updateData(e, "email")}
        required
        className="px-3 py-2 rounded-full shadow-search"
      />
      <input
        type="password"
        placeholder="password"
        required
        value={formData.password}
        onChange={(e) => updateData(e, "password")}
        className="px-3 py-2 rounded-full shadow-search"
      />
      {!isLogin && (
        <input
          type="password"
          placeholder="confirm password"
          required
          value={formData.passwordConfirm}
          onChange={(e) => updateData(e, "passwordConfirm")}
          className="px-3 py-2 rounded-full shadow-search"
        />
      )}
      <button className="w-full bg-gradient-to-br from-sky-300 to-sky-600 p-2 text-white text-xl font-bold">
        {isLogin ? "Login" : "Signup"}
      </button>
      <div className="flex justify-center gap-3">
        {isLogin ? "Don't have an account?" : "Have an account?"}
        <span
          className="text-slate-950 underline cursor-pointer"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "Signup" : "Login"}
        </span>
      </div>
    </form>
  );
}

export default AuthForm;
