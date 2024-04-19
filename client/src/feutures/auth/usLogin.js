import { signUser } from "../../services/authApi";
import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

export function useLogin(formData, isLogin, reset) {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => signUser({ formData, isLogin }),
    onSuccess: () => {
      reset();
      navigate("/");
    },
  });

  return { mutate, isLoading };
}
