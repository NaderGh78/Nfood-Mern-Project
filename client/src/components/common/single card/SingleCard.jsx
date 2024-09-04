import "./singleCard.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getAllUserCart } from "../../../redux/apiCalls/cartApiCall";
import { setShowModal, setShowRgisterModal } from "../../../redux/slices/modalSlice";
import { addToWishlist, fetchUserWishlists } from "../../../redux/apiCalls/wishlistApiCall";
import { FaHeart, FaEye } from "react-icons/fa";
import { clearWishlist } from "../../../redux/slices/wishlistSlice";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const SingleCard = ({ product }) => {

    const { _id, name, description, price, newPrice, image } = product;

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const { userWishlist } = useSelector((state) => state.wishlist);

    const { userCart, cartLoading } = useSelector((state) => state.cart);

    const [inCart, setInCart] = useState(false);

    const [loading, setLoading] = useState(false);

    /*===========================================*/

    // Determine if the product is in the wishlist
    const isInWishlist = currentUser ? userWishlist.includes(_id) : false;

    /*===========================================*/

    // Add to wishlist handler
    const addToWishlistHandler = async (userId, productId) => {

        if (currentUser) {

            try {

                await dispatch(addToWishlist(userId, productId));

                // Fetch updated wishlist
                await dispatch(fetchUserWishlists(userId));

            } catch (error) {

                console.error('Failed to add to wishlist', error);

            }

        } else {

            dispatch(setShowRgisterModal());

        }
    };

    /*===========================================*/

    // Add item to cart and open the right cart modal if the user is logged in
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

        if (!currentUser) {

            setInCart(false);

            dispatch(clearWishlist()); // Clear wishlist on logout

        } else {

            checkInCart();

        }

    }, [userCart, _id, currentUser, dispatch]);

    /*===========================================*/

    // Fetch user cart and wishlist on login
    useEffect(() => {

        if (currentUser) {

            dispatch(getAllUserCart());

            dispatch(fetchUserWishlists(currentUser._id));

        }

    }, [currentUser, dispatch]);

    /*===========================================*/

    return (
        <div className="my-card">
            <div className="card">
                <div className="card-top">
                    {newPrice !== 1 && <span className="new-price">Sale!</span>}
                    <img src={image?.url} alt={name} />
                </div>
                <div className="card-body">
                    <h5 className="card-title text-capitalize" style={{ userSelect: "text", color: "var(--dark)" }}>
                        <Link to={`/products/${_id}`}>{name}</Link>
                    </h5>
                    <p className="card-text">
                        {description.length > 38 ? description.slice(0, 38) + "..." : description}
                    </p>
                    <p className="edit-price">
                        {newPrice !== 1
                            ? <>
                                <span className="text-decoration-line-through text-secondary">${price}</span>
                                <span className="ms-2">${newPrice}</span>
                            </>
                            : <span>${price}</span>}
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
                            <FaHeart style={{ color: isInWishlist ? "var(--light-red)" : "#686d6f" }} />
                        </span>
                        <Link to={`/products/${_id}`}><FaEye /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCard; 