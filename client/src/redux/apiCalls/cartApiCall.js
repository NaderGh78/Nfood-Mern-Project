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

    dispatch(cartActions.setCartLoading());

    try {

      await userRequest.post("/api/carts", newItem);

      dispatch(cartActions.addItemToCart(newItem));

    } catch (error) {

      console.error("Failed to add to cart", error);

    } finally {
      dispatch(cartActions.clearCartLoading());
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

      if (res && res.data && res.data.data && res.data.data.cart !== null) {

        const { products, totalAmount } = res.data.data.cart;

        dispatch(cartActions.setUserCarts(products));

        dispatch(cartActions.getCartTotal(totalAmount));

      }

    } catch (error) {

      console.error('API Error:', error);

    } finally {

      dispatch(cartActions.clearCartLoading());

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