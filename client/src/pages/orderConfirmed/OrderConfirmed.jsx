import './orderConfirmed.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { request } from '../../utils/request';
import moment from 'moment';
import confirmedImg from "./confirmed-img.png";

/*======================================*/
/*======================================*/
/*======================================*/

function OrderConfirmed() {

    const { currentUser } = useSelector((state) => state.auth);

    const [userOrders, setUserOrders] = useState([]);

    const [orderLoading, setOrderLoading] = useState(false);

    //  username
    const splitName = currentUser?.username?.split(" ")[0];

    /*===========================================*/

    // get user orders
    useEffect(() => {

        const getUserOrder = async () => {

            try {

                setOrderLoading(true);

                const res = await request.get(`/api/orders/user-order`,
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

                setOrderLoading(false);


            } catch (error) {
                console.log(error)
            }
        };

        getUserOrder();

    }, []);

    /*======================================*/

    return (
        <div className='order-confirmed-box'>
            <div className="top">
                <div className="confirmed-img">
                    <img src={confirmedImg} alt="" />
                </div>
                <p>Hi <span className='text-capitalize'>{splitName}</span></p>
                <h2>Thank you for your order!</h2>
                <span className='d-inline-block rounded-2 py-2 px-3 text-white bg-warning mt-4'>
                    {
                        !orderLoading ?
                            <>
                                Order No: {userOrders[0]?._id}
                            </> :
                            <>
                                <div
                                    className="spinner-border"
                                    style={{ width: "24px", height: "24px", borderWidth: "2px", color: "#ddd" }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </>
                    }
                </span>
            </div>
            {/* end top */}

            <div className="middle d-flex align-items-center justify-content-center">
                <div>
                    <h6>Date</h6>
                    {
                        !orderLoading ?
                            <>
                                <p>{moment(userOrders[0]?.createdAt).format().slice(0, 16).replace("T", " ")}</p>
                            </> :
                            <>
                                <div
                                    className="spinner-border"
                                    style={{ width: "24px", height: "24px", borderWidth: "2px", color: "#888" }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </>
                    }
                </div>
                <div>
                    <h6>Billing Address</h6>
                    {
                        !orderLoading ?
                            <>
                                <p>
                                    {userOrders[0]?.userInfo?.city}{" "}
                                    {userOrders[0]?.userInfo?.street}{" "}
                                    {userOrders[0]?.userInfo?.building}{" "}
                                    {userOrders[0]?.userInfo?.apartment}
                                </p>
                            </> :
                            <>
                                <div
                                    className="spinner-border"
                                    style={{ width: "24px", height: "24px", borderWidth: "2px", color: "#888" }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </>
                    }
                </div>
                <div>
                    <h6>Payment Method</h6>
                    {
                        !orderLoading ?
                            <>
                                <p>
                                    {
                                        userOrders[0]?.paymentType === "COD" ? "Cash on delivery"
                                            : userOrders[0]?.paymentType === "ONLINE" ? "Online"
                                                : ""
                                    }
                                </p>
                            </> :
                            <>
                                <div
                                    className="spinner-border"
                                    style={{ width: "24px", height: "24px", borderWidth: "2px", color: "#888" }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </>
                    }
                </div>
            </div>
            {/* end middle */}

            <div className="bottom d-flex justify-content-evenly align-items-center pb-4">
                <Link
                    to={`/profile/${currentUser?._id}`}
                    className='text-decoration-none bg-dark text-white py-2 px-3 rounded-2'
                >
                    Go to order information
                </Link>
                <Link
                    to="/menu"
                    className='text-decoration-none bg-dark text-white py-2 px-3 rounded-2'
                >
                    Continue shopping
                </Link>
                <Link
                    to="/"
                    className='text-decoration-none bg-dark text-white py-2 px-3 rounded-2'
                >
                    Back home
                </Link>
            </div>
            {/* end bottom */}
        </div>
    )
}

export default OrderConfirmed;