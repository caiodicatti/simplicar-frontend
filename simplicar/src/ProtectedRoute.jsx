import { Navigate } from "react-router-dom";
import { isTokenExpired } from './services/authService';

export default function ProtectedRoute({ children }) {
    const user = JSON.parse(localStorage.getItem("userSession") || "{}");

    if (isTokenExpired(user)) {
        return <Navigate to="/" replace />;
    }

    return children;
}