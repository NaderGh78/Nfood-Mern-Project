import { useState } from "react";
import { useSelector } from "react-redux";
import OrderUi from "./OrderUi";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const SingleOrder = () => {

    const { cartItems } = useSelector((state) => state.cart);

    const reverseCartItems = [...cartItems].reverse();

    // to make my custom accordion,by default is show
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    // to update the isAccordionOpen
    const handleToggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    }

    /*===========================================*/
    return (
        <div className="tab-single">
            {/* my custom accordion */}
            <div className="panel-group">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className='left'>
                            <span>#64E408E5B31</span>
                            <p className='mb-0'>
                                <span>2023-08-22 01:01</span> - <span>To be delivered in 15 minutes</span>
                            </p>
                        </div>
                        <h4 className="right mb-0" onClick={handleToggleAccordion}>
                            <span>View Order</span>
                        </h4>
                    </div>
                    <div className={isAccordionOpen ? "panel-collapse" : "panel-collapse panel-close"}>
                        <ul>
                            {/* here we draw the orders */}
                            {reverseCartItems?.map((d, i) => (
                                <li key={i}>
                                    <OrderUi data={d} />
                                </li>
                            ))}
                        </ul>
                        <div className="panel-footer d-flex align-items-center justify-content-between">
                            Total Price <span className="green-span">$20</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleOrder;