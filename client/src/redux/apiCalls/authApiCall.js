import { authActions } from "../slices/authSlice";
import { request } from "../../utils/request";
import { toast } from "react-toastify";
import { cartActions } from "../slices/cartSlice";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// Register User
export function registerUser(user) {

    return async (dispatch) => {

        try {

            // run the loader
            dispatch(authActions.setLoading());

            const { data } = await request.post("/api/auth/register", user);

            dispatch(authActions.register(data.message));

            // remove loader
            dispatch(authActions.clearLoading());

        } catch (error) {

            toast.error(error?.response?.data?.message);

            // remove loader
            dispatch(authActions.clearLoading());

        }
    }
}

/*===========================================*/

// Login User
export function loginUser(user) {

    return async (dispatch) => {

        try {

            // run the loader
            dispatch(authActions.setLoading());

            const { data } = await request.post("/api/auth/login", user);

            dispatch(authActions.login(data));

            // remove loader
            dispatch(authActions.clearLoading());

            localStorage.setItem("currentUser", JSON.stringify(data));

        } catch (error) {

            toast.error(error?.response?.data?.message);

            // remove loader
            dispatch(authActions.clearLoading());

        }
    }
}

/*===========================================*/

// Logout User
export function logoutUser() {

    return (dispatch) => {

        dispatch(authActions.logout());

        dispatch(cartActions.clearCart());

        localStorage.removeItem("currentUser");

    }

} 