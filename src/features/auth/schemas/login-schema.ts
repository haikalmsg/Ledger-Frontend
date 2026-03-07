import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").regex(/\d/, "Password must contain at least one number")
});

export type LoginSchema = z.infer<typeof loginSchema>;