import "./about.css";
import { HeadingBreadcrumb } from "../../allPagesPaths";
import { useTitle } from "../../components/helpers";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const About = () => {

    // get the page title
    useTitle(`About - Nfood`);

    /*===========================================*/

    return (
        <div className="about">
            <HeadingBreadcrumb breadcrumb="About" />
            About
        </div>
    )
}

export default About;