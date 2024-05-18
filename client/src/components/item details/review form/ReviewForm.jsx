import "./reviewForm.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearIsProductReview, setIsProductReview } from "../../../redux/slices/productSlice";
import { setShowRgisterModal } from "../../../redux/slices/modalSlice";
import { request } from "../../../utils/request";
import { LiaStarSolid } from "react-icons/lia";
import { toast } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const ReviewForm = (props) => {

    const { rating, setRating, hover, setHover, product } = props;

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const { id } = useParams();

    const [reviewComment, setReviewComment] = useState("");

    const [isAddedRating, setIsAddedRating] = useState(false);

    const { isProductReview } = useSelector((state) => state.product);

    /*===========================================*/

    const productReviewtHandler = (e) => {

        e.preventDefault();

        const addReview = async () => {

            try {

                // clearIsProductReview();
                setIsProductReview();

                setIsAddedRating(true);

                const reqObj = {
                    rating: rating,
                    comment: reviewComment,
                    productId: product._id
                }

                const res = await request.put(`/api/products/review`, reqObj,
                    {
                        headers: {
                            Authorization: "Bearer " + currentUser.token,
                        }
                    });

                setIsAddedRating(false);

                clearIsProductReview();

                if (res && res?.data) {

                    const { message } = res?.data;

                    toast.success(message);

                    // empty the comment field
                    setReviewComment("");

                    // reset the stars rating to initial value,when add rating
                    setRating(null);

                }

            } catch (error) {

                toast.error(error.response?.data?.message);

                setIsAddedRating(false);

            }
        };

        addReview(id);

    };

    /*===========================================*/

    return (
        <div className="review-form">
            {
                currentUser ?
                    <>
                        <div className="your-rating">
                            <h6>Your rating <span className="text-danger">*</span></h6>
                            <div className="rating-stars-box">
                                {[...Array(5)].map((Star, i) => {
                                    const ratingValue = i + 1;
                                    return (
                                        <label key={i}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={ratingValue}
                                                onClick={() => setRating(ratingValue)}
                                            />
                                            <LiaStarSolid
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(null)}
                                                className={
                                                    ratingValue <= (hover || rating) ? "active" : ""
                                                }
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                            <form onSubmit={productReviewtHandler}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="msg"
                                        className="form-label d-block"
                                    >
                                        Your review
                                        <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        name=""
                                        id="msg"
                                        cols="30"
                                        rows="10"
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                    ></textarea>
                                </div>
                                <button type="submit" className="reviw-btn">
                                    {isAddedRating
                                        ?
                                        <>
                                            <div
                                                className="spinner-border"
                                                style={{
                                                    width: "24px",
                                                    height: "24px",
                                                    borderWidth: "2px",
                                                    color: "#fff"
                                                }}
                                            >
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </>
                                        :
                                        "Add Rating"
                                    }
                                </button>
                            </form>
                        </div>
                    </> :
                    <p className="must-login">
                        You must be logged in to comment.
                        <span
                            onClick={() => dispatch(setShowRgisterModal())}
                        >Login
                        </span>
                    </p>
            }
        </div>
    )
}

export default ReviewForm;