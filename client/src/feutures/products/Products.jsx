import Spiner from "../../ui/Spiner";
import ProductCart from "../../ui/ProductCart";
import NoProduct from "../../ui/NoProduct";
import { useAllProducts } from "./useAllProducts";

function Products() {
  const { data, isLoading } = useAllProducts();

  if (isLoading) {
    return <Spiner />;
  }

  return (
    <div className="p-10 flex flex-wrap gap-4">
      {data.docs.length === 0 ? (
        <NoProduct />
      ) : (
        data.docs.map((product) => (
          <ProductCart
            key={product._id}
            title={product.title}
            description={product.description}
            price={product.price}
            images={product.images}
            id={product._id}
          />
        ))
      )}
    </div>
  );
}
export default Products;
