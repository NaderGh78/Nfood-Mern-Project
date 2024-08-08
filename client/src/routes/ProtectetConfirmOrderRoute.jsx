import { Navigate } from "react-router-dom";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const ProtectetConfirmOrderRoute = ({ children }) => {
    const isOrderConfirmed = localStorage.getItem('isOrderConfirmed') === 'true';

    return isOrderConfirmed ? children : <Navigate to="/checkout" replace />;
};

export default ProtectetConfirmOrderRoute;