import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./features/auth/pages/loginPage/login-page";
import RegisterPage from "./features/auth/pages/registerPage/register-page";
import RegisterSuccessPage from "./features/auth/pages/registerSucessPage/register-sucess-page";
import NotFoundPage from "./features/misc/notFound";
import ProtectedRoute from "./components/protected-routes";
import TransactionPage from "./features/transactions/pages/transaction-page";

function App() {
  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%", flex: 0 }}>
        <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "left",
          gap: "16px",
          padding: "16px",
        }}
      >
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={() => window.location.href = "/account"}>Account</button>
              <button onClick={() => window.location.href = "/categories"}>Categories</button>
            </div>
            <button onClick={handleLogout}>Logout</button>

            
          </>
        )}
      </nav>


        <div style={{ flex: 1, display: "flex", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Navigate to={token ? "/transactions" : "/login"} replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/register-success" element={<RegisterSuccessPage />} />
            <Route path="/transactions" element={<ProtectedRoute><TransactionPage /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;