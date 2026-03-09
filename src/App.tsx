import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./features/auth/pages/login-page";
import RegisterPage from "./features/auth/pages/register-page";
import RegisterSuccessPage from "./features/auth/pages/register-sucess-page";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%", flex: 1 }}>
        <nav style={{ display: "flex", gap: "12px", padding: "16px" }}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>

        <div style={{ flex: 1, display: "flex", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
            <Route path="/register-success" element={<RegisterSuccessPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;