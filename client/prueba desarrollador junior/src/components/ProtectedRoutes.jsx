import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth"



export const ProtectedRoutes = () => {

    const { usuario } = useAuth();

    if (!usuario) {
        return <Navigate to={'/'} />
    }
    return <Outlet />
}
