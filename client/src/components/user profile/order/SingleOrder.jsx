import { useState } from "react";
import OrderUi from "./OrderUi";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const SingleOrder = ({ singleOrder }) => {

    const { products } = singleOrder;

    // to make my custom accordion,by default is show
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    // to update the isAccordionOpen
    const handleToggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    }

    // console.log(singleOrder?.createdAt)
    // 2024-07-27T15:49:06.381Z

    /*===========================================*/

    return (
        <div className="tab-single">
            {/* my custom accordion */}
            <div className="panel-group">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className='left'>
                            <span>#{singleOrder?._id}</span>
                            <p className='mb-0'>
                                <span>
                                    {singleOrder?.createdAt?.slice(0, 16).replace("T", " ")}
                                </span> - <span>To be delivered in 15 minutes</span>
                            </p>
                        </div>
                        <h4 className="right mb-0" onClick={handleToggleAccordion}>
                            <span>View Order</span>
                        </h4>
                    </div>
                    <div className={isAccordionOpen ? "panel-collapse" : "panel-collapse panel-close"}>
                        <ul>
                            {/* here we draw the orders */}
                            {products?.map((d, i) => (
                                <li key={i}>
                                    <OrderUi data={d} />
                                </li>
                            ))}
                        </ul>
                        <div className="panel-footer d-flex align-items-center justify-content-between">
                            Total Price <span className="green-span">${singleOrder?.totalAmount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleOrder;