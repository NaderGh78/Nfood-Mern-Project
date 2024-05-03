import "./reviewForm.css";
import { LiaStarSolid } from "react-icons/lia";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const ReviewForm = () => {
    return (
        <div className="review-form">
            <p style={{ color: "#808080" }}>
                Your email address will not be published. Required fields are marked
                <span className="text-danger">*</span>
            </p>
            <div className="your-rating">
                <h6>Your rating <span className="text-danger">*</span></h6>
                <ul>
                    <li><LiaStarSolid /></li>
                    <li><LiaStarSolid /></li>
                    <li><LiaStarSolid /></li>
                    <li><LiaStarSolid /></li>
                    <li><LiaStarSolid /></li>
                </ul>
                <form>
                    <div className="mb-3">
                        <label htmlFor="msg" className="form-label d-block">Your review <span className="text-danger">*</span></label>
                        <textarea name="" id="msg" cols="30" rows="10"></textarea>
                    </div>

                    <div className="input-flex">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="name" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                            <input type="email" className="form-control" id="email" />
                        </div>
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="check" />
                        <label className="form-check-label" htmlFor="check">
                            Save my name, email, and website in this browser for the next time I comment.
                        </label>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm;