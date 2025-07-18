import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            // if a user is not logged in, send him to the login page
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;