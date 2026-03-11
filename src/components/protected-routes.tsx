import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type ProtectedRouteProps = {
  children: ReactNode;
};

type JwtPayload = {
  exp?: number;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (!decoded.exp) {
      localStorage.removeItem("access_token");
      return <Navigate to="/login" replace />;
    }

    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("access_token");
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  } catch (error) {
    localStorage.removeItem("access_token");
    return <Navigate to="/login" replace />;
  }
}