import "./singleReview.css";
import { useSelector } from "react-redux";
import { LiaStarSolid, LiaTrashSolid } from "react-icons/lia";
import { FaClock } from "react-icons/fa6";
import moment from 'moment';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const SingleReview = ({ review, onDelteReview }) => {

    const { currentUser } = useSelector((state) => state.auth);

    // // make the rating as an array 
    const ratingArr = [...Array(review.rating).keys()];

    /*===========================================*/

    return (
        <div className="single-review">
            <img src={review.image} alt="single review" />
            <div className="review">
                <ul>
                    {/* draw the rating star ui */}
                    {ratingArr?.map((el, index) => (<li key={index}><LiaStarSolid /></li>))}
                </ul>
                <div className="title">
                    <div className="d-flex gap-2">
                        <h5>{review.name}</h5>
                        <p><FaClock /> {moment(review.createdAt).fromNow()}</p>
                    </div>
                    {
                        // if this review belongs to current user show the delete icon
                        review.userId === currentUser?._id ?
                            <span className="delete-icon" onClick={onDelteReview}><LiaTrashSolid /></span> :
                            ""
                    }
                </div>
                <p className="review-desc">{review.comment}</p>
            </div>
            {/* end review */}
        </div>
    )
}

export default SingleReview;