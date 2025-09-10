// src/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { isTokenExpired } from './services/authService';


export default function ProtectedRoute({ children }) {
    const raw = localStorage.getItem("userToken");
    const token = raw ? JSON.parse(raw) : null;

    if (isTokenExpired(token)) {
        return <Navigate to="/" replace />;
    }

    return children;
}
