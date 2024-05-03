import "./order.css";
import { useSelector } from "react-redux";
import SingleOrder from "./SingleOrder";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Order = () => {

    const { cartItems } = useSelector((state) => state.cart);

    /*===========================================*/

    return (
        <div className="orders">
            <h2 className='tab-title'>Order History</h2>
            {
                !cartItems.length ?
                    <h5 className="noOrders">No orders yet.</h5> :
                    [1, 2, 3].map(el => (
                        <SingleOrder key={el} />
                    ))
            }
        </div>
    )
}

export default Order;