import { Link } from "react-router-dom";

function LoginBtn() {
  return (
    <Link
      to="auth"
      className="text-lg text-white hover:text-red-200 duration-300 py-1 px-3 rounded-full cursor-pointer bg-gradient-to-br from-orange-400 to-red-400"
    >
      Login
    </Link>
  );
}

export default LoginBtn;
