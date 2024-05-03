import "./testimonials.css";
import { LiaStarSolid } from "react-icons/lia";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LeftArrow, RightArrow } from "../../common/customSliderArrows";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Testimonials = () => {

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: false,
        dots: false,
        autoplaySpeed: 2700,
        arrows: true,
        prevArrow: <LeftArrow />,
        nextArrow: <RightArrow />,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,

                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    };

    /*===========================================*/

    const testimonialAll = [
        {
            id: 1,
            desc: "I had the pleasure of dining at Foodi last night, and I'm still raving about the experience! The attention to detail in presentation and service was impeccable",
            name: "salim ahmad",
            imgSrc: "/assets/images/reviews/img1.jpg"
        },
        {
            id: 2,
            desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ",
            name: "jhon doe",
            imgSrc: "/assets/images/reviews/img2.jpg"
        },
        {
            id: 2,
            desc: "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            name: "mimi loren",
            imgSrc: "/assets/images/reviews/img3.jpg"
        }
    ];

    /*===========================================*/

    return (
        <div className="testimonials">
            <div className="myContainer">
                <div className="testimonials-content">
                    <div className="left">
                        <img src={process.env.PUBLIC_URL + `/assets/images/testimonials.png`} alt="testimonials" />
                    </div>
                    <div className="right">
                        <h5 className="homeH5">TESTIMONIALS</h5>
                        <h2 className="homeH2">What Our Customers Say About Us</h2>
                        <div className="reviewSlider">
                            {/* <Slider {...settings}>
                                {testimonialAll.map(el => (
                                    <SingleTestimonial data={el} key={el.id} />
                                ))}
                            </Slider> */}
                            <p className="homeP">
                                "I had the pleasure of dining at Foodi last night, and I'm still raving about the experience!
                                The attention to detail in presentation and service was impeccable"
                            </p>
                        </div>
                        <div className="reviews">
                            <div className="img-box">
                                <ul>
                                    <li><img src={process.env.PUBLIC_URL + `/assets/images/reviews/img1.jpg`} alt="review 1" /></li>
                                    <li><img src={process.env.PUBLIC_URL + `/assets/images/reviews/img2.jpg`} alt="review 2" /></li>
                                    <li><img src={process.env.PUBLIC_URL + `/assets/images/reviews/img3.jpg`} alt="review 3" /></li>
                                </ul>
                            </div>
                            <div className="feedback">
                                <h5>Customer Feedback</h5>
                                <p><LiaStarSolid /> <strong>4.8</strong> <span>(18.6k Reviews)</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials;