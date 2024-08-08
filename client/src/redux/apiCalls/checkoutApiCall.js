import { checkoutActions } from "../slices/checkoutSlice";
import { request } from "../../utils/request";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const TOKEN = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).token :
    "";
const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
};

/*===========================================*/

// initiate checkout
export function initiateCheckout(checkoutProduct) {

    return async (dispatch) => {

        try {

            const res = await request.post("/api/checkout", checkoutProduct, config);

            if (res && res?.data?.data !== null) {

                const { orderId } = res?.data?.data;

                dispatch(checkoutActions.setOrderId(orderId));

            }

        } catch (error) {
            //  console.log(error);
        }
    };
} 