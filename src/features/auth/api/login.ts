import { api } from "../../../lib/axios";
import type { LoginPayload, LoginResponse } from "../types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/users/login", payload);
  return response.data;
}
