import "./homeHeader.css";
import { Link } from "react-router-dom";
import { LiaStarSolid } from "react-icons/lia";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const HomeHeader = () => {
    return (
        <div className="home-header">
            <div className="myContainer">
                <div className="header-content">
                    <div className="left">
                        <h1>
                            Dive into Delights Of Delectable <span>Food</span>
                        </h1>
                        <p className="homeP">Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship</p>
                        <Link to="/menu" className="custom-btn">Order Now</Link>
                    </div>
                    <div className="right">
                        <img src={process.env.PUBLIC_URL + `/assets/images/banner.png`} alt="banner" />
                        <div className="img-box">
                            <div className="spicy">
                                <img src={process.env.PUBLIC_URL + `/assets/images/spicy.png`} alt="spicy" />
                                <div>
                                    <h6 className="mb-0">Spicy noodles</h6>
                                    <ul>
                                        <li><LiaStarSolid /></li>
                                        <li><LiaStarSolid /></li>
                                        <li><LiaStarSolid /></li>
                                    </ul>
                                    <span>$18.00</span>
                                </div>
                            </div>
                            <div className="spicy">
                                <img src={process.env.PUBLIC_URL + `/assets/images/spicy.png`} alt="spicy" />
                                <div>
                                    <h6 className="mb-0">Spicy noodles</h6>
                                    <ul>
                                        <li><LiaStarSolid /></li>
                                        <li><LiaStarSolid /></li>
                                        <li><LiaStarSolid /></li>
                                    </ul>
                                    <span>$18.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader;