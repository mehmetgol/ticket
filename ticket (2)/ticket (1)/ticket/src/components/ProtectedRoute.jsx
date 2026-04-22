import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" />; // Yetkisi yoksa ana sayfaya at
    }

    return children;
};

export default ProtectedRoute;