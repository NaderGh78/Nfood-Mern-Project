import "./singleCardListView.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getAllUserCart } from "../../../redux/apiCalls/cartApiCall";
import { setShowModal, setShowRgisterModal } from "../../../redux/slices/modalSlice";
import { addToWishlist, fetchUserWishlists } from "../../../redux/apiCalls/wishlistApiCall";
import { FaHeart, FaEye } from "react-icons/fa";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const SingleCardListView = ({ product }) => {

    const { _id, name, description, price, newPrice, image } = product;

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const { userWishlist } = useSelector((state) => state.wishlist);

    const { userCart, cartLoading } = useSelector((state) => state.cart);

    const [inCart, setInCart] = useState(false);

    const [loading, setLoading] = useState(false);

    /*===========================================*/

    // add to wishlist handler
    const addToWishlistHandler = async (userId, productId) => {

        if (currentUser) {

            try {

                await dispatch(addToWishlist(userId, productId));
                // Fetch updated wishlist
                // await dispatch(fetchWishlist(userId));

            } catch (error) {

                console.error('Failed to add to wishlist', error);

            }
        } else {
            dispatch(setShowRgisterModal());
        }
    };

    useEffect(() => {

        if (currentUser) {

            dispatch(fetchUserWishlists(currentUser._id));

        }

    }, [currentUser, dispatch]);

    /*===========================================*/

    // Add item to cart and open the right cart modal IN CASE there is an user log in
    const handleAddToCart = async (productId) => {

        if (currentUser) {

            setLoading(true);

            try {

                await dispatch(addToCart({ productId, quantity: 1 }));

                await dispatch(getAllUserCart());

                dispatch(setShowModal());

            } catch (error) {

                console.error('Failed to add to cart', error);

            } finally {
                setLoading(false);
            }

        } else {
            dispatch(setShowRgisterModal());
        }
    };

    /*===========================================*/

    // Check if the product is in the cart
    useEffect(() => {

        const checkInCart = () => {

            if (userCart && userCart.length > 0) {

                const isProductInCart = userCart.some(item => item.product?._id === _id);

                setInCart(isProductInCart);

            } else {
                setInCart(false);
            }
        };

        // Immediately reset inCart when user logs out
        if (!currentUser) {
            setInCart(false);
        } else {
            checkInCart();
        }

    }, [userCart, _id, currentUser]);

    /*===========================================*/

    // Fetch user cart on login
    useEffect(() => {

        if (currentUser) {
            dispatch(getAllUserCart());
        }

    }, [currentUser, dispatch]);

    /*===========================================*/

    return (
        <div className="single-card-list-view">
            {newPrice !== 1 ? <span className="new-price">Sale!</span> : ""}
            <div className="image-left">
                {/* <img src={process.env.PUBLIC_URL + itemImg} alt={itemName} /> */}
                <img src={image?.url} alt={name} />
            </div>
            <div className="right">
                <h5>
                    <Link to={`/products/${_id}`}>
                        {name}
                    </Link>
                </h5>
                <p className="card-text">
                    {description.length > 90 ? description.slice(0, 90) + "..." : description}
                </p>
                <p className="edit-price">
                    {newPrice !== 1
                        ?
                        <>
                            <span className="text-decoration-line-through text-secondary">${price}</span>
                            <span className="ms-2">${newPrice}</span>
                        </>
                        :
                        <>
                            <span>${price}</span>
                        </>}
                </p>
                <div className="bottom">
                    <button
                        type="button"
                        onClick={() => handleAddToCart(_id)}
                        disabled={loading || cartLoading || inCart}
                    >
                        {loading ? (
                            <div className="single-cart-spinner">
                                <h6
                                    className="spinner-border mb-0"
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        borderWidth: "2px",
                                        color: "#fff"
                                    }}>
                                    <span className="visually-hidden">Loading...</span>
                                </h6>
                            </div>
                        ) : (
                            inCart ? <>In Cart <small>1</small></> : "Add to Cart"
                        )}
                    </button>
                    <span onClick={() => addToWishlistHandler(currentUser?._id, _id)}>
                        <FaHeart style={{ color: userWishlist.includes(_id) ? "var(--light-red)" : "#686d6f" }} />
                    </span>
                    <Link to={`/products/${_id}`}><FaEye /></Link>
                </div>
                {/* end bottom */}
            </div>
        </div>
    )
}

export default SingleCardListView;