import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/productsApi";

export function useProduct(id) {
  const { data, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProduct(id),
  });

  return { data, isLoading };
}
