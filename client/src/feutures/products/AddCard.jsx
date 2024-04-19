import { useAddToCard } from "./useAddToCard";

function AddCard({ userId, productId }) {
  const { mutate, isLoading } = useAddToCard(userId, productId);

  return (
    <button
      disabled={isLoading}
      className="p-3 text-white bg-red-400 basis-[50%] text-center cursor-pointer"
      onClick={() => mutate()}
    >
      Add to Card
    </button>
  );
}
export default AddCard;
