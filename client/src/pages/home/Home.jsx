import "./home.css";
import { useTitle } from "../../components/helpers";
import {
    HomeCategory,
    HomeHeader,
    OurStory,
    SliderCategories,
    Testimonials
} from "../../allPagesPaths";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Home = () => {

    useTitle(`Nfood`);

    /*===========================================*/

    return (
        <div className="home">
            <HomeHeader />
            <HomeCategory />
            <SliderCategories />
            <Testimonials />
            <OurStory />
        </div>
    )
}

export default Home;