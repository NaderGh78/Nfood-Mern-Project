import "./serarch.css";
import { useTitle } from "../../components/helpers";
import { HeadingBreadcrumb } from "../../allPagesPaths";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Search = () => {

    useTitle(`Search - Nfood`);

    /*===========================================*/

    return (
        <div className="search">
            <HeadingBreadcrumb breadcrumb="search" />
            Search
        </div>
    )
}

export default Search;