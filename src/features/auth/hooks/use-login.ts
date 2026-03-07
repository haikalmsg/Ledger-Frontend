import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import type { LoginPayload, LoginResponse } from "../types";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login,
  });
}