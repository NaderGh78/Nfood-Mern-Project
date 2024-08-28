import { wishlistActions } from "../slices/wishlistSlice";
import { userRequest } from "../../utils/request";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// add to wishlist
export function addToWishlist(userId, productId) {

    return async (dispatch) => {

        try {

            const res = await userRequest.post("/api/users/wishlist", { userId, productId });

            if (res && res?.data) {

                dispatch(wishlistActions.setuserWishlist(res.data));

            }

        } catch (error) {

            console.error("Failed to add to wishlist", error);

        }
    };
}

/*===========================================*/

// fetch user wishlists
export function fetchUserWishlists(userId) {

    return async (dispatch) => {

        try {

            const res = await userRequest.get(`/api/users/wishlist/${userId}`);

            dispatch(wishlistActions.setuserWishlist(res.data));

        } catch (error) {

            console.error("Failed to fetch wishlist", error);

        }

    };
} 