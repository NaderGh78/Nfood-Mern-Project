import "./sliderCategories.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { request } from "../../../utils/request";
import { SingleCard } from "../../../allPagesPaths";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// to avoid the console error
import { LeftArrow, RightArrow } from "../../common/customSliderArrows";
import Spinner from "../../common/spinner/Spinner";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const SliderCategories = () => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    /*===========================================*/

    // get all products to draw slider ui
    useEffect(() => {

        const getProducts = async () => {

            try {

                setLoading(true);

                const res = await request.get(`/api/products`);

                if (res && res?.data) {

                    const { products } = res?.data;

                    setProducts(products);

                    setLoading(false);

                }

            } catch (error) {
                console.log(error)
            }
        };

        getProducts();

    }, []);

    /*===========================================*/

    const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        fade: false,
        dots: false,
        autoplaySpeed: 1000,
        arrows: true,
        prevArrow: <LeftArrow />,
        nextArrow: <RightArrow />,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true
                }
            }
        ]
    };

    /*===========================================*/

    // show the first 7 products from whole products to draw the cart slider
    const slicedProducts = products.length > 0 && products?.slice(0, 7);

    if (loading) return <Spinner />;
    return (
        <div className="slider-categories">
            <div className="myContainer">
                <div className="slider-content">
                    {slicedProducts.length > 0
                        &&
                        <>
                            <h5 className="homeH5">CUSTOMER FAVORITES</h5>
                            <h2 className="homeH2">Popular Catagories</h2>
                            <Slider {...settings}>
                                {
                                    slicedProducts?.map(el => (
                                        <SingleCard product={el} key={el._id} />
                                    ))
                                }
                            </Slider>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default SliderCategories;