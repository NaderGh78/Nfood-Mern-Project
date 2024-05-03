import { cartActions } from "../slices/cartSlice";
import { request } from "../../utils/request";
import { toast } from "react-toastify";

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

// Add Item To Cart
export function addToCart(newItem) {

  return async (dispatch, getState) => {

    try {

      const res = await request.post("/api/carts", newItem, config);

      dispatch(cartActions.addItemToCart(newItem));

    } catch (error) {
      //  console.log(error);
    }
  };
}

/*===========================================*/

// get all user cart
export function getAllUserCart() {

  return async (dispatch, getState) => {

    try {

      const res = await request.get("/api/carts", config);

      if (res && res?.data?.data?.cart !== null) {

        const { products, totalAmount } = res?.data?.data?.cart

        dispatch(cartActions.setUserCarts(products));

        dispatch(cartActions.getCartTotal(totalAmount));

      }

    } catch (error) {
      //  console.log(error);
    }
  };
}

/*===========================================*/

// remove single cart
export function removeSingleCart(productId) {

  return async (dispatch, getState) => {

    dispatch(cartActions.setIsCartDeleted());

    try {

      const res = await request.delete(`/api/carts/${productId}`, config);

      dispatch(cartActions.clearIsCartDeleted());

    } catch (error) {
      //  console.log(error);
    }
  };
}

/*===========================================*/

// empty all cart
export function emptyUserCart() {

  return async (dispatch, getState) => {

    dispatch(cartActions.setIsCartEmpty());

    try {

      const res = await request.delete(`/api/carts/`, config);

      const { message } = res.data;

      toast.success(message);

      dispatch(cartActions.clearCart());

      dispatch(cartActions.clearIsCartEmpty());

    } catch (error) {
      //  console.log(error);
    }
  };
}  