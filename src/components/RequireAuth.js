import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log(allowedRoles);
    console.log(auth);
    return (
        allowedRoles?.includes(auth?.role)
            ? <Outlet />
            : auth?.user
                ? <Navigate
                    to="/unauthorized"
                    state={{ from: location }}
                    replace />
                : <Navigate
                    to="/main"
                    state={{ from: location }}
                    replace />
    );
}

export default RequireAuth;