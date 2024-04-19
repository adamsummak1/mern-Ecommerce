import { useMutation } from "@tanstack/react-query";
import { handleBuy } from "../../services/buyApi";
import { useNavigate } from "react-router-dom";

export function useBuy(userId, productId) {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => handleBuy(userId, productId),
    onSuccess: () => {
      navigate("/");
    },
  });
  return { mutate, isLoading };
}
