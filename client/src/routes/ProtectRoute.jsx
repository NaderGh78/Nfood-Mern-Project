import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const ProtectRoute = () => {
    const { currentUser } = useSelector((state) => state.auth);
    return currentUser ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectRoute;