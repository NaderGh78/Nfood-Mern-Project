import "./singleReview.css";
import { LiaStarSolid } from "react-icons/lia";
import { FaClock } from "react-icons/fa6";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const SingleReview = () => {
    return (
        <div className="single-review">
            <img src={process.env.PUBLIC_URL + "/assets/images/review.png"} alt="single review" />
            <div className="review">
                <ul>
                    <li><LiaStarSolid /></li>
                    <li><LiaStarSolid /></li>
                    <li><LiaStarSolid /></li>
                    <li><LiaStarSolid /></li>
                    <li><LiaStarSolid /></li>
                </ul>
                <div className="title">
                    <h5>salim doe</h5>
                    <p><FaClock /> September 4, 2020</p>
                </div>
                <p className="review-desc">
                    The shirt was not the fabric I believed it to be. It says Classic Fit but was made like the
                    older versions, not the soft cotton like my others. I don’t understand how the labels are
                    the same but a completely different shirt. Oh well, stuck with it now.
                </p>
            </div>
            {/* end review */}
        </div>
    )
}

export default SingleReview;