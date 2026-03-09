import { api } from "../../../lib/axios";
import type { RegisterPayload, RegisterResponse} from "../types";

export async function Register(payload: RegisterPayload): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/users", payload);
  return response.data;
}
