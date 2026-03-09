import { useMutation } from "@tanstack/react-query";
import type { RegisterResponse, RegisterPayload } from "../types";
import { Register } from "../api/register";

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: Register,
  });
}