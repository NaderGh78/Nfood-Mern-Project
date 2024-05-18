import "./reviews.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSingleReview, getSpecificProductRviews } from "../../../redux/apiCalls/productApiCall";
import { ReviewForm, SingleReview } from "../../../allPagesPaths";
import swal from "sweetalert";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Reviews = (props) => {

    const { product, rating, setRating, hover, setHover } = props;

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const { productReviews } = useSelector((state) => state.product);

    /*===========================================*/

    // get specific product reviews
    useEffect(() => {
        dispatch(getSpecificProductRviews(product?._id));
    }, [product?._id]);

    /*===========================================*/

    // here find the review of current user , in order to get the [review id] form it
    const findUserReview = productReviews?.find(el => el.userId === currentUser?._id);

    /*===========================================*/

    // Delete review Handler
    const deleteReviewHandler = () => {
        swal({
            title: "Are you sure to delete your comment ?",
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {
            if (isOk) {
                dispatch(deleteSingleReview(product?._id, findUserReview._id));
            }
        });
    };

    /*===========================================*/

    return (
        <div className="reviews">
            <div className="reviews-content">
                <div className="left">
                    {
                        productReviews && productReviews?.length > 0 ?
                            product?.reviews?.map(el => (
                                <SingleReview
                                    review={el}
                                    onDelteReview={deleteReviewHandler}
                                    key={el._id} />
                            )) :
                            <p style={{ fontSize: "20px" }}>No rating yet,make one.</p>
                    }
                </div>
                <div className="right">
                    <ReviewForm
                        product={product}
                        rating={rating}
                        setRating={setRating}
                        hover={hover}
                        setHover={setHover}
                    />
                </div>
            </div>
        </div>
    )
}

export default Reviews;