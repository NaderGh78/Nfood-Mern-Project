import "./order.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { request } from "../../../utils/request";
import SingleOrder from "./SingleOrder";
import Spinner from "../../common/spinner/Spinner";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Order = () => {

    const { currentUser } = useSelector((state) => state.auth);

    const [userOrders, setUserOrders] = useState([]);

    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    /*===========================================*/

    // get user orders
    useEffect(() => {

        const getUserOrder = async () => {

            setLoading(true);

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
            } finally {

                setLoading(false);

            }
        };

        getUserOrder();

    }, []);

    /*===========================================*/

    return (
        <div className="orders">
            <h2 className='tab-title'>Order History</h2>
            {
                loading ? (<Spinner />) :
                    userOrders?.length > 0 ? (
                        userOrders?.map((el, idx) => (
                            <SingleOrder key={idx} singleOrder={el} />
                        ))
                    ) :
                        (<h5 className="noOrders">No results found.</h5>)
            }
        </div>
    )
}

export default Order; 