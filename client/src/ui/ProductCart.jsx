import { Link } from "react-router-dom";

function ProductCart({ images, title, description, price, id }) {
  return (
    <div className="p-3 w-96  bg-slate-100 rounded-lg flex flex-col gap-3">
      <img
        className="w-full h-[200px]"
        src={`../src/assets/images/${images[0]}`}
        alt="img"
      />
      <h2 className="text-lg">{title}</h2>
      <p className="text-sm text-[#777]">{description}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-sm">{price}$</span>
        <Link
          to={`/product/${id}`}
          className="bg-red-300 py-0 px-2 rounded-lg text-white cursor-pointer"
        >
          -&gt;
        </Link>
      </div>
    </div>
  );
}

export default ProductCart;
