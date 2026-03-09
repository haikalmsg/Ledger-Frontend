import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../hooks/use-register";
import { registerSchema, type RegisterSchema } from "../schemas/register-schema";

export default function RegisterPage() {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterSchema) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        alert("Registration success");
        window.location.href = "/register-success";
      },
      onError: (error) => {
        alert(error.message || "Registration failed");
      },
    });
  };

  return (
    <div style={{margin: "40px auto", textAlign: "center", justifyContent: "center", width: "100%" }}>
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Register</h1>

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

        <div style={{ marginBottom: "12px" }}>
            <label>Full Name</label>
            <input
                type="text"
                {...register("full_name")}
                style={{ display: "block", width: "100%", padding: "8px" }}
            />
            {errors.full_name && (
                <p style={{ color: "red" }}>{errors.full_name.message}</p>
            )}
            </div>

        <button
          type="submit"
          disabled={registerMutation.isPending}
          style={{ padding: "8px 12px" }}
        >
          {registerMutation.isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
    </div>
  );
}