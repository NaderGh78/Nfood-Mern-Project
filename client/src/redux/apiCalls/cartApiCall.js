import { cartActions } from "../slices/cartSlice";
import { userRequest } from "../../utils/request";

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

  return async (dispatch) => {

    try {

      const res = await userRequest.post("/api/carts", newItem);

      dispatch(cartActions.addItemToCart(newItem));

    } catch (error) {
      //  console.log(error);
    }
  };
}

/*===========================================*/

// get all user cart 
export function getAllUserCart() {

  return async (dispatch) => {

    dispatch(cartActions.setCartLoading());

    try {

      const res = await userRequest.get("/api/carts");

      // console.log('API Response:', res.data);
      if (res && res.data && res.data.data && res.data.data.cart !== null) {

        const { products, totalAmount } = res.data.data.cart;

        dispatch(cartActions.setUserCarts(products));

        dispatch(cartActions.getCartTotal(totalAmount));

      }

      dispatch(cartActions.clearCartLoading());

    } catch (error) {
      console.error('API Error:', error);
    }
  };
}

/*===========================================*/

// remove single cart
export function removeSingleCart(productId) {

  return async (dispatch) => {

    dispatch(cartActions.setIsCartDeleted());

    try {

      await userRequest.delete(`/api/carts/${productId}`, config);

      dispatch(cartActions.removeSingleItem(productId));

      dispatch(cartActions.clearIsCartDeleted());

    } catch (error) {
      console.error("Failed to remove item:", error);
    }

  };
}

/*===========================================*/

// empty all cart
export function emptyUserCart() {

  return async (dispatch) => {

    dispatch(cartActions.setIsCartEmpty());

    try {

      const res = await userRequest.delete(`/api/carts/`, config);

      const { message } = res.data;

      dispatch(cartActions.clearCart());

    } catch (error) {

      console.error("Failed to clear cart:", error);

    } finally {

      dispatch(cartActions.clearIsCartEmpty());

    }
  };
}  