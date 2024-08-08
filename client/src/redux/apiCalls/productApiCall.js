import { productActions } from "../slices/productSlice";
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

// get reviews for specific product
export function getSpecificProductRviews(pId) {

    return async (dispatch) => {

        try {

            const res = await request.get(`/api/products/reviews?id=${pId}`);

            if (res && res?.data?.reviews) {

                const { reviews } = res?.data;

                dispatch(productActions.getProductReviews(reviews));

            }

        } catch (error) {
            //  console.log(error);
        }

    };
}

/*===========================================*/

// delete user review by user himself
export function deleteSingleReview(pId, reviewId) {

    return async (dispatch, getState) => {

        try {

            const res = await request.delete(`/api/products/review?productId=${pId}&id=${reviewId}`, config);

            if (res && res?.data) {

                const { message } = res?.data;

                toast.success(message);

            }

        } catch (error) {
            //  console.log(error);
        }

    };
}