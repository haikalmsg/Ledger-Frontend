export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};
export type LoginErrorResponse = {
  detail: string;
};
export type RegisterPayload = {
    email: string;
    password: string;
    full_name: string;
};

export type RegisterResponse = {
    id: number;
    email: string;
    full_name: string;
    created_at: Date;
    updated_at: Date;
};