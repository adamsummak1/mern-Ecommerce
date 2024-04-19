import { useQuery } from "@tanstack/react-query";
import { getMyBought } from "../../services/buyApi";
import Spiner from "../../ui/Spiner";
import { useIsLoggedIn } from "../auth/useIsLoggedIn";
import NoProduct from "../../ui/NoProduct";
import ProductCart from "../../ui/ProductCart";

function Bought() {
  const { data: user, isLoading: isCheckingUser } = useIsLoggedIn();

  const { data, isLoading } = useQuery({
    queryKey: ["bought"],
    queryFn: getMyBought,
  });

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
        <NoProduct />
      ) : (
        data.data.map((product) => (
          <ProductCart
            id={product.product._id}
            description={product.product.description}
            images={product.product.images}
            price={product.product.price}
            title={product.product.title}
            key={product._id}
          />
        ))
      )}
    </div>
  );
}

export default Bought;
