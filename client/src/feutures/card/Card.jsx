import { useIsLoggedIn } from "./../auth/useIsLoggedIn";
import Spiner from "../../ui/Spiner";
import ProductCart from "../../ui/ProductCart";
import { useNavigate } from "react-router-dom";
import NoProduct from "../../ui/NoProduct";
import { useFecthCard } from "./useFechCard";

function Card() {
  const { data: user, isLoading: isCheckingUser } = useIsLoggedIn();
  const navigate = useNavigate();

  const { data, isLoading } = useFecthCard();

  if (!isCheckingUser) {
    if (user.state !== "success") {
      navigate("/auth");
    }
  }
  if (isLoading) {
    return (
      <div className="h-screen">
        <Spiner />
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-wrap gap-4">
      {data.data.length === 0 ? (
        <NoProduct text="no items in card " />
      ) : (
        data.data.map((product) => (
          <ProductCart
            id={product.product._id}
            description={product.product.description}
            images={product.product.images}
            price={product.product.price}
            title={product.product.title}
            key={product.id}
          />
        ))
      )}
    </div>
  );
}

export default Card;
