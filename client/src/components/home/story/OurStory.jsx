import "./ourStory.css";
import { Link } from "react-router-dom";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const OurStory = () => {

    const allStories = [
        {
            id: 1,
            storyImag: "/assets/images/services/icon1.png",
            storyTitle: "Catering",
            storyDesc: "Delight your guests with our flavors and presentation"
        },
        {
            id: 2,
            storyImag: "/assets/images/services/icon2.png",
            storyTitle: "Fast delivery",
            storyDesc: "We deliver your order promptly to your door"
        },
        {
            id: 3,
            storyImag: "/assets/images/services/icon3.png",
            storyTitle: "Online Ordering",
            storyDesc: "Explore menu & order with ease using our Online Ordering"
        },
        {
            id: 4,
            storyImag: "/assets/images/services/icon4.png",
            storyTitle: "Gift Cards",
            storyDesc: "Give the gift of exceptional dining with Foodi Gift Cards"
        }
    ];

    /*===========================================*/

    return (
        <div className="our-story">
            <div className="myContainer">
                <div className="our-story-content">
                    <div className="left">
                        <h5 className="homeH5">OUR STORY & SERVICES</h5>
                        <h2 className="homeH2">Our Culinary Journey And Services</h2>
                        <p className="homeP">
                            Rooted in passion, we curate unforgettable dining experiences and
                            offer exceptional services, blending culinary artistry with warm hospitality.
                        </p>
                        <Link to="" className="custom-btn">Eplore</Link>
                    </div>
                    <div className="right">
                        {
                            allStories.map(el => (
                                <div className="single-story" key={el.id}>
                                    <img src={process.env.PUBLIC_URL + el.storyImag} alt={`story ${el.id}`} />
                                    <h5>{el.storyTitle}</h5>
                                    <p>{el.storyDesc}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStory;