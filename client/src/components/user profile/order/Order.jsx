import "./order.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { request } from "../../../utils/request";
import SingleOrder from "./SingleOrder";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Order = () => {

    const { currentUser } = useSelector((state) => state.auth);

    const [userOrders, setUserOrders] = useState([]);

    const { id } = useParams();

    /*===========================================*/

    // get user orders
    useEffect(() => {

        const getUserOrder = async () => {

            try {

                const res = await request.get(`/api/orders/${id}`,
                    {
                        headers: {
                            Authorization: "Bearer " + currentUser?.token,
                        },
                    }
                );

                if (res && res?.data?.userOrders !== null) {

                    const { userOrders } = res?.data;

                    setUserOrders(userOrders);

                }

            } catch (error) {
                console.log(error)
            }
        };

        getUserOrder();

    }, []);

    /*===========================================*/

    return (
        <div className="orders">
            <h2 className='tab-title'>Order History</h2>
            {
                !userOrders?.length ?
                    <h5 className="noOrders">No orders yet.</h5> :
                    userOrders.map((el, idx) => (
                        <SingleOrder key={idx} singleOrder={el} />
                    ))
            }
        </div>
    )
}

export default Order;