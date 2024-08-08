import "./checkout.css";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserCart } from "../../redux/apiCalls/cartApiCall";
import { useTitle } from "../../components/helpers";
import Spinner from "../../components/common/spinner/Spinner";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Checkout = () => {

    useTitle(`Checkout - Nfood`);

    const dispatch = useDispatch();

    const { pathname } = useLocation();

    const { userCart, totalCart, cartLoading } = useSelector((state) => state.cart);

    // make the first product at the top element in table
    let reversedUserCart = [...userCart].reverse();

    /*===========================================*/
    // get user cart
    const getUserCart = () => {
        dispatch(getAllUserCart());
    }

    useEffect(() => {
        getUserCart();
    }, [])

    /*===========================================*/

    return (
        <div className='checkout-box'>
            <Link to="/" className="logoChekout">
                <h5 className='my-logo'><span>N</span>Food</h5>
            </Link>
            <div className="checkout-content d-flex mt-5">
                <div className='left'>
                    <div className="checkout-tabs">
                        <ul className="account-link-lists list-unstyled m-0 d-flex mb-4">
                            <li><Link to="/checkout" className='text-decoration-none'>information</Link></li>
                            {
                                pathname.split("/")[2] === "shipping" &&
                                <li style={{ color: "#0d6efd" }}>&nbsp; /&nbsp;shipping</li>
                            }
                        </ul>
                    </div>
                    <Outlet />
                </div>
                {/*left end */}
                <div className="right">
                    {
                        !cartLoading ?
                            <>
                                <div className="top">
                                    <div className="checkout-products-show d-flex gap-2 mb-3">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="bg-transparent">Item</th>
                                                    <th scope="col" className="text-center bg-transparent">Item Name</th>
                                                    <th scope="col" className="text-center bg-transparent">Quantity</th>
                                                    <th scope="col" className="text-center bg-transparent">Price</th>
                                                    <th scope="col" className="text-center bg-transparent">Total Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reversedUserCart?.map((el, idx) =>
                                                (
                                                    <tr className="align-middle" key={idx}>
                                                        <td className="position-relative px-0 bg-transparent">
                                                            <img src={el.product?.image?.url} alt={el.product?.name} />
                                                            <span className="span-quantity">{el.quantity}</span>
                                                        </td>
                                                        <td className="text-center bg-transparent">{el.product?.name}</td>
                                                        <td className="text-center bg-transparent">{el.quantity}</td>
                                                        <td className="text-center bg-transparent">
                                                            {el.product.newPrice !== 1
                                                                ?
                                                                <>
                                                                    <span className="text-decoration-line-through text-secondary">${el.product.price}</span>
                                                                    <span className="ms-2">${el.product.newPrice}</span>
                                                                </>
                                                                :
                                                                <>
                                                                    <span>${el.product.price}</span>
                                                                </>}
                                                        </td>
                                                        <td className="text-center bg-transparent">${el.price}</td>
                                                    </tr>
                                                ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="middle">
                                    <div className='d-flex align-items-center justify-content-between mt-5'>
                                        <h6>Subtotal</h6>
                                        <span>${(totalCart).toFixed(2)}</span>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between mt-3'>
                                        <h6>Shipping</h6>
                                        <span>free shipping</span>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <div className='d-flex align-items-center justify-content-between mt-3'>
                                        <h6>Subtotal</h6>
                                        <span>${(totalCart).toFixed(2)}</span>
                                    </div>
                                </div>
                            </>
                            :
                            <Spinner />
                    }
                </div>
                {/* right end */}
            </div>
            {/* checkout content end */}
        </div>
    )
}

export default Checkout;