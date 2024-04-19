import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../services/productsApi";

export function useAllProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return { data, isLoading };
}
