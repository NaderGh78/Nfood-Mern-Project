import "./checkout.css";
import { useTitle } from "../../components/helpers";
import { HeadingBreadcrumb } from "../../allPagesPaths";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Checkout = () => {

    useTitle(`Checkout - Nfood`);

    /*===========================================*/

    return (
        <div className='checkout'>
            <HeadingBreadcrumb breadcrumb="Checkout" />
            Checkout
        </div>
    )
}

export default Checkout;