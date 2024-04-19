import { useIsLoggedIn } from "../feutures/auth/useIsLoggedIn";
import LoginBtn from "./LoginBtn";
import { Link } from "react-router-dom";

function Header() {
  const { data, isLoading } = useIsLoggedIn();

  return (
    <div className="shadow-header py-5 px-20 flex justify-between items-center bg-[#f6f6f6]">
      <div>
        <h1 className="text-3xl font-bold font-mono">SnapShop</h1>
      </div>
      <div className="flex gap-5 items-center">
        <Link
          to="/"
          className="text-lg hover:text-red-700 duration-300 cursor-pointer"
        >
          Home
        </Link>
        <Link
          to="/card"
          className="text-lg hover:text-red-700 duration-300 cursor-pointer"
        >
          Card
        </Link>
        <Link
          to="/bought"
          className="text-lg hover:text-red-700 duration-300 cursor-pointer"
        >
          Bought
        </Link>
        {isLoading || (!data.state === "success" && <LoginBtn />)}
      </div>
    </div>
  );
}
export default Header;
