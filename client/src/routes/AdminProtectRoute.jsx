import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminProtectRoute = () => {

    const { currentUser } = useSelector((state) => state.auth);

    /*===========================================*/

    return currentUser && currentUser.isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    );
}

export default AdminProtectRoute;