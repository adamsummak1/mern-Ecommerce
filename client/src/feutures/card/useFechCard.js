import { useQuery } from "@tanstack/react-query";
import { fetchCard } from "../../services/cardApi";

export function useFecthCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["myCard"],
    queryFn: fetchCard,
  });

  return { data, isLoading };
}
