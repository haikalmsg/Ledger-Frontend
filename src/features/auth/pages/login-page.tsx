import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/login-schema";
import type { LoginSchema } from "../schemas/login-schema";
import { useLogin } from "../hooks/use-login";

export default function LoginPage() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        localStorage.setItem("access_token", response.access_token);
        alert("Login success");
      },
      onError: (error) => {
        alert(error.message || "Login failed");
      },
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, width: "100%" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h1>Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "12px" }}>
            <label>Email</label>
            <input
              type="email"
              {...register("email")}
              style={{ display: "block", width: "100%", padding: "8px" }}
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Password</label>
            <input
              type="password"
              {...register("password")}
              style={{ display: "block", width: "100%", padding: "8px" }}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            style={{ padding: "8px 12px" }}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}