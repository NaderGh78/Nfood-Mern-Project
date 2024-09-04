import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/*===========================================*/
/*===========================================*/
/*===========================================*/
// userId, productId
// currentUser?._id,_id
const SingleWishList = ({ data, currentUser, onAddToWishlist, onRemoveFromWishlist, loading, userCart }) => {

    const { _id, name, image, price, newPrice } = data;

    const [inCart, setInCart] = useState(false);

    /*===========================================*/

    useEffect(() => {

        if (userCart && userCart.length > 0) {

            const isProductInCart = userCart.some(item => item.product?._id === _id);

            setInCart(isProductInCart);

        } else {

            setInCart(false);

        }

    }, [userCart, _id]);

    /*===========================================*/

    return (
        <div className="single-wishlist">
            <div className="left">
                <div className="img-handler">
                    <img src={image?.url} alt={name} />
                </div>
            </div>
            <div className="right">
                <ul>
                    <li><Link to={`/products/${_id}`}>{name}</Link></li>
                    <li>
                        {newPrice !== 1
                            ? <>
                                <span className="text-decoration-line-through text-secondary">${price}</span>
                                <span className="ms-2">${newPrice}</span>
                            </>
                            : <span>${price}</span>}
                    </li>
                    <li>August 20, 2024</li>
                </ul>
                <div className="button-box">
                    <button onClick={() => onAddToWishlist(_id)} disabled={loading || inCart}>
                        {loading ? (
                            <div className="single-cart-spinner">
                                <h6
                                    className="spinner-border mb-0"
                                    style={{
                                        width: "21px",
                                        height: "21px",
                                        borderWidth: "2px",
                                        color: "#fff"
                                    }}>
                                    <span className="visually-hidden">Loading...</span>
                                </h6>
                            </div>
                        ) : (
                            inCart ? "In Cart" : "Add to Cart"
                        )}
                    </button>
                    <button
                        className="bg-danger"
                        onClick={() => onRemoveFromWishlist(currentUser?._id, _id)}>
                        Remove from Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleWishList; 