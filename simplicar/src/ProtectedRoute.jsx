import { Navigate } from "react-router-dom";
import { isTokenExpired } from './services/authService';

export default function ProtectedRoute({ children }) {
    const session = JSON.parse(localStorage.getItem("userSession") || "{}");
    const token = session.token;

    if (isTokenExpired(token)) {
        return <Navigate to="/" replace />;
    }

    return children;
}