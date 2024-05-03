import "./reviews.css";
import { ReviewForm, SingleReview } from "../../../allPagesPaths";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Reviews = () => {
    return (
        <div className="reviews">
            <div className="reviews-content">
                <div className="left">
                    <SingleReview />
                    <SingleReview />
                    <SingleReview />
                    <SingleReview />
                    <SingleReview />
                    <SingleReview />
                    <SingleReview />
                    <SingleReview />
                </div>
                <div className="right">
                    <ReviewForm />
                </div>
            </div>
        </div>
    )
}

export default Reviews;