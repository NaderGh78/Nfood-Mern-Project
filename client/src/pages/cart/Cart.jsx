import "./cart.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, emptyUserCart, getAllUserCart, removeSingleCart } from "../../redux/apiCalls/cartApiCall";
import { initiateCheckout } from "../../redux/apiCalls/checkoutApiCall";
import { useTitle } from "../../components/helpers";
import { HeadingBreadcrumb } from "../../allPagesPaths";
import { AiOutlineCloseCircle } from "react-icons/ai";
import swal from "sweetalert";
import { setLoading } from "../../redux/slices/cartSlice";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Cart = () => {

    useTitle(`Cart - Nfood`);

    const dispatch = useDispatch();

    const { cart, userCart, totalCart, loading } = useSelector((state) => state.cart);

    const [quantity, setQuantity] = useState(1);

    // make the first product at the top element in table
    let reversedUserCart = [...userCart].reverse();

    /*===========================================*/

    useEffect(() => {

        const fetchData = async () => {

            dispatch(setLoading(true));

            await dispatch(getAllUserCart());

            dispatch(setLoading(false));

        };

        fetchData();

    }, [dispatch, totalCart]);

    const formattedTotalCart = (typeof totalCart === 'number' && !isNaN(totalCart))
        ? totalCart.toFixed(2)
        : '0.00';

    /*===========================================*/

    // Delete item Handler
    const deleteItemHandler = (productId) => {
        swal({
            title: "Are you sure to delete this item ?",
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {
            if (isOk) {
                dispatch(removeSingleCart(productId));
            }
        });
    };

    /*===========================================*/

    // clear cart handler
    const emptyCartHandler = () => {
        swal({
            title: "Are you sure to clear all cart ?",
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {
            if (isOk) {
                dispatch(emptyUserCart());
            }
        });
    };

    /*===========================================*/

    const handleIncrementQuantity = (id, quantity) => {

        if (!id) {

            console.error('Product ID is undefined');

            return;

        }

        const newQty = quantity + 1;

        const reqObj = { productId: id, quantity: newQty };

        dispatch(addToCart(reqObj));

    };

    const handleDecrementQuantity = (id, quantity) => {

        if (!id) {

            console.error('Product ID is undefined');

            return;

        }

        const newQty = quantity > 1 ? quantity - 1 : 1;

        const reqObj = { productId: id, quantity: newQty };

        dispatch(addToCart(reqObj));

    };

    /*===========================================*/

    // initiate Checkout when ckeckout from cart page
    // const initiateCheckoutHandler = () => {
    //     dispatch(initiateCheckout({ paymentType: "COD" }));
    // }

    /*===========================================*/

    return (
        <div className="cart">
            <HeadingBreadcrumb breadcrumb="cart" />
            <>
                {reversedUserCart.length > 0
                    ?
                    <>
                        <div className="myContainer">
                            <div className="cart-content">
                                <div className="my-table">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">PRODUCT</th>
                                                <th scope="col">PRICE</th>
                                                <th scope="col">QUANTITY</th>
                                                <th scope="col">SUBTOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                reversedUserCart.map((el, idx) => (
                                                    <tr key={idx}>
                                                        <th scope="row">{idx + 1}</th>
                                                        <td>
                                                            <div className="img-box">
                                                                <button onClick={() => deleteItemHandler(el.product?._id)}>
                                                                    <AiOutlineCloseCircle />
                                                                </button>
                                                                <Link to={`/products/${el.product?._id}`}>
                                                                    {/* <img src={process.env.PUBLIC_URL + el.itemImg} alt={el.itemName} /> */}
                                                                    <img src={el.product?.image?.url} alt={el.product?.name} />
                                                                </Link>
                                                                <Link to={`/products/${el.product?._id}`}>
                                                                    <h5>{el.product?.name}</h5>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {el.product?.newPrice !== 1
                                                                ?
                                                                <>
                                                                    <span className="text-decoration-line-through text-secondary">${el.product?.price}</span>
                                                                    <span className="ms-2">${el.product?.newPrice}</span>
                                                                </>
                                                                :
                                                                <>
                                                                    <span>${el.product?.price}</span>
                                                                </>}
                                                        </td>
                                                        <td>
                                                            <div className="input-box">
                                                                <span>{el.quantity}</span>
                                                                <div>
                                                                    <button onClick={() => handleIncrementQuantity(el.product?._id, el.quantity)}>+</button>
                                                                    <button onClick={() => handleDecrementQuantity(el.product?._id, el.quantity)}>-</button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {/* here the price is [price * quantity] */}
                                                            {el.product?.newPrice !== 1
                                                                ? <span>${(el.quantity * el.product?.newPrice).toFixed(2)}</span>
                                                                : <span>${(el.quantity * el.product?.price).toFixed(2)}</span>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="total-cart">
                                    <h5>CART TOTALS</h5>
                                    <ul>
                                        <li>
                                            <h6>
                                                Subtotal
                                                <span>
                                                    {
                                                        !loading ?
                                                            <> ${formattedTotalCart}</> :
                                                            <>
                                                                <div
                                                                    className="spinner-border"
                                                                    style={{ width: "18px", height: "18px", borderWidth: "2px", color: "var(--pistach)" }}>
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            </>
                                                    }
                                                </span>
                                            </h6>
                                        </li>
                                        <li><h6>Shipping<span>Shipping costs are calculated during checkout.</span></h6></li>
                                        <li>
                                            <h6>
                                                Total
                                                <span>
                                                    {
                                                        !loading ?
                                                            <> ${formattedTotalCart}</> :
                                                            <>
                                                                <div
                                                                    className="spinner-border"
                                                                    style={{ width: "18px", height: "18px", borderWidth: "2px", color: "var(--pistach)" }}>
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            </>
                                                    }
                                                </span>
                                            </h6>
                                        </li>
                                    </ul>
                                    <Link to="/checkout">Proceed to checkout</Link>
                                    <button onClick={emptyCartHandler}>Clear Cart</button>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <div className="empty-cart">
                        <img src={process.env.PUBLIC_URL + "/assets/images/empty-cart.png"} alt="empty-cart" />
                        <h5>Your cart is currently empty.</h5>
                        <Link to="/menu">Return to menu</Link>
                    </div>
                }
            </>
        </div>
    )
}

export default Cart;