import { Navigate } from "react-router-dom";
import { isTokenExpired } from './services/authService';
import { useAuth } from './context/AuthContext';


export default function ProtectedRoute({ children }) {
    const { user } = useAuth();

    if (isTokenExpired(user)) {
        return <Navigate to="/" replace />;
    }

    return children;
}