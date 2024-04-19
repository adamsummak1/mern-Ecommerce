import { useMutation } from "@tanstack/react-query";
import { handleAddToCard } from "../../services/cardApi";

export function useAddToCard(userId, productId) {
  const { mutate, isLoading } = useMutation({
    mutationFn: () => handleAddToCard(userId, productId),
  });

  return { mutate, isLoading };
}
