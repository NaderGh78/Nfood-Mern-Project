import "./singleCardListView.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getAllUserCart } from "../../../redux/apiCalls/cartApiCall";
import { setShowModal, setShowRgisterModal } from "../../../redux/slices/modalSlice";
import { FaHeart, FaEye } from "react-icons/fa";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const SingleCardListView = ({ product }) => {

    const { _id, name, description, price, newPrice, image } = product;

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const [inCart, setInCart] = useState(false);

    const [heart, setHeart] = useState(false);

    const { userCart } = useSelector((state) => state.cart);

    /*===========================================*/

    // change heart color when user like the item
    const handleChange = () => {
        setHeart(!heart);
    }
    /*===========================================*/

    // Add item to cart and open the right cart modal IN CASE there is an user log in
    const handleAddToCart = (productId) => {

        if (currentUser) {

            dispatch(addToCart({ productId, quantity: 1 }));

            dispatch(setShowModal());

        } else {

            dispatch(setShowRgisterModal());

        }

    };

    /*===========================================*/

    // Fetch user cart and update inCart state
    useEffect(() => {

        if (currentUser) {

            dispatch(getAllUserCart());

        } else {

            setInCart(false);

        }

    }, [currentUser, dispatch]);

    /*===========================================*/

    // Update inCart state based on userCart
    useEffect(() => {

        if (userCart) {

            const isProductInCart = userCart.some(item => item.product?._id === _id);

            setInCart(isProductInCart);

        }

    }, [userCart, _id]);

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
                    <span onClick={() => handleAddToCart(_id)}>
                        {/* {inCart ? "In Cart" : "Add to Cart"}{inCart ? <small>{itemQty}</small> : ""} */}
                        {inCart ? "In Cart" : "Add to Cart"}{inCart ? <small>1</small> : ""}
                    </span>
                    <span onClick={() => handleChange()}>
                        <FaHeart style={{ color: heart ? "var(--light-red)" : "#686d6f" }} />
                    </span>
                    <Link to={`/products/${_id}`}><FaEye /></Link>
                </div>
                {/* end bottom */}
            </div>
        </div>
    )
}

export default SingleCardListView;