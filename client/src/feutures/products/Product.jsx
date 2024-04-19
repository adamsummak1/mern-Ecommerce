import { useParams } from "react-router-dom";
import Spiner from "./../../ui/Spiner";
import { useProduct } from "./useProduct";
import AddCard from "./AddCard";
import Buy from "./Buy";
import { useIsLoggedIn } from "./../auth/useIsLoggedIn";

function Product() {
  const { id } = useParams();

  const { data, isLoading } = useProduct(id);
  const { data: user } = useIsLoggedIn();

  if (isLoading) {
    return (
      <div className="h-screen">
        <Spiner />
      </div>
    );
  }

  return (
    <div className="px-14 py-8">
      <img
        src={`../src/assets/images/${data.data.images[0]}`}
        alt="imageCover"
        className="w-full h-96"
      />
      <div className="flex gap-5 mt-5">
        {data.data.images.length > 1 &&
          data.data.images.map((img, index) => (
            <img
              key={index}
              src={`../src/assets/images/${img}`}
              alt="image"
              className="w-60 h-40 shadow-search"
            />
          ))}
      </div>
      <h1 className="text-5xl">{data.data.title}</h1>
      <p className="text-xl text-[#777] mt-5 ">{data.data.description}</p>
      <span className="text-xl font-bold block mt-5">{data.data.price}$</span>
      <div className="flex mt-10">
        <AddCard userId={user.id} productId={id} />
        <Buy userId={user.is} productId={id} />
      </div>
    </div>
  );
}

export default Product;
