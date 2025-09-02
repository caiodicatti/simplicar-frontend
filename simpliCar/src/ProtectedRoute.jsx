// src/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem("userToken"); // ajuste conforme seu login

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}
