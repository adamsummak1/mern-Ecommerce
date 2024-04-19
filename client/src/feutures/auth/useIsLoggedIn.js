import { useQuery } from "@tanstack/react-query";
import { isLoggedIn } from "./../../services/authApi";

export function useIsLoggedIn() {
  const { data, isLoading } = useQuery({
    queryKey: ["isLoggedIn"],
    queryFn: isLoggedIn,
  });
  return { data, isLoading };
}
