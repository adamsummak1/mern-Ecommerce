import { useBuy } from "./useBuy";

function Buy({ userId, productId }) {
  const { mutate, isLoading } = useBuy(userId, productId);

  return (
    <button
      disabled={isLoading}
      onClick={() => mutate()}
      className="p-3 text-white bg-orange-300 basis-[50%] text-center cursor-pointer"
    >
      Buy now
    </button>
  );
}
export default Buy;
