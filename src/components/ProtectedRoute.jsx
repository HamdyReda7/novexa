import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles = ["user"] }) {
    const { token, user, loading } = useAuth();

    if (loading) {
        return (
            <div className="auth-loading-screen">
                <span className="auth-loading-text">Loading...</span>
            </div>
        );
    }

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
