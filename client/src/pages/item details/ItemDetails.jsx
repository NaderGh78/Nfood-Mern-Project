import "./itemDetails.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getAllUserCart } from "../../redux/apiCalls/cartApiCall";
import { setShowRgisterModal } from "../../redux/slices/modalSlice";
import { request } from "../../utils/request";
import { LiaStarSolid, LiaStarHalfSolid } from "react-icons/lia";
import { FaBasketShopping } from "react-icons/fa6";
import { FaFacebookF, FaHeart, FaTwitter, FaYoutube } from "react-icons/fa";
import { RelatedProducts, StickyAddCart, TabsItemDetailes } from "../../allPagesPaths";
import { HashLink } from 'react-router-hash-link';
import { useTitle } from "../../components/helpers/index";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const ItemDetails = () => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const { isProductReview } = useSelector((state) => state.product);

    const [product, setProduct] = useState({});

    const [products, setProducts] = useState([]);

    const [quantity, setQuantity] = useState(1);

    const { id } = useParams();

    const [inCart, setInCart] = useState(false);

    // in order to show the bottom banner when scroll the page
    const [isVisible, setIsVisible] = useState(false);

    const { userCart } = useSelector((state) => state.cart);

    const [loading, setLoading] = useState(false);

    /*===========================================*/

    // capitalize the first letters that given in order to put it as browser page title 
    const finalSentence = product?.name?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

    useTitle(`${finalSentence} - Nfood`);

    /*===========================================*/

    // fetch single product every time changed id
    useEffect(() => {

        const getProduct = async () => {

            try {

                setLoading(true);

                const { data } = await request.get(`/api/products/${id}`);

                setProduct(data);

                setLoading(false);

            } catch (error) {
                console.log(error)
            }
        };

        getProduct();

        // reset the quantity, in case we choose another related product
        setQuantity(1);

    }, [id]);

    /*===========================================*/

    // get all fetchProducts
    useEffect(() => {

        const getProducts = async () => {

            try {

                const res = await request.get(`/api/products`);

                if (res && res?.data) {

                    const { products } = res?.data;

                    setProducts(products);

                    setLoading(false);

                }

            } catch (error) {
                console.log(error)
            }
        };

        getProducts();

    }, [id]);

    // get all related products categories except the current product that we get by it id
    const getAllProductsWithSameCat =
        products?.filter(ele => ele.category === product?.category)
            .filter(ele => ele._id !== product?._id);

    // get first 4 similair categories products
    const getFirstFourProducts =
        getAllProductsWithSameCat && getAllProductsWithSameCat.length > 4 ?
            getAllProductsWithSameCat.slice(0, 4) : getAllProductsWithSameCat;

    /*===========================================*/

    // add item to cart  
    const addToCartHandler = (productId) => {

        if (currentUser) {

            const reqObj = { productId: productId, quantity: 1 }

            dispatch(addToCart(reqObj));

        } else {
            dispatch(setShowRgisterModal())
        }

        window.scrollTo(0, 0);
    }


    /*===========================================*/
    /*
        here we should get user cart in order to filter its items index,
        in order to change the [add to cart] text btn to [in cart] 
        */
    const getUserCart = () => {
        dispatch(getAllUserCart());
    }

    useEffect(() => {
        getUserCart();
    }, [userCart, id])

    /*===========================================*/

    /*
     get the product from user cart in order to change the the button text when add an item,
     from add to cart to [in cart]
    */
    const getProductFromUserCart = userCart?.map(item => item.product);

    useEffect(() => {

        if (getProductFromUserCart && getProductFromUserCart.length > 0) {

            const productIndx = getProductFromUserCart.findIndex(
                (ele) => ele?._id === product?._id
            );

            setInCart(productIndx === -1 ? false : true);

        }

    }, [getProductFromUserCart, userCart, id])

    /*===========================================*/

    useEffect(() => {

        window.addEventListener("scroll", listenToScroll);

        return () =>
            window.removeEventListener("scroll", listenToScroll);

    }, [isVisible])

    const listenToScroll = () => {

        let heightToShowComp = 700;

        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;

        if (winScroll > heightToShowComp) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    /*===========================================*/

    const handleIncrementQuantity = (id) => {

        if (currentUser) {

            const count = document.querySelector(".count");

            const qty = count.valueAsNumber + 1;

            setQuantity(qty);

            const reqObj = { productId: id, quantity: qty }

            dispatch(addToCart(reqObj));

        } else {

            dispatch(setShowRgisterModal());

        }
    };

    /*===========================================*/

    const handleDecrementQuantity = () => {

        if (currentUser) {

            const count = document.querySelector(".count");

            const qty = count.valueAsNumber === 1 ? count.valueAsNumber : count.valueAsNumber - 1;

            setQuantity(qty);

            const reqObj = { productId: id, quantity: qty }

            dispatch(addToCart(reqObj));

        } else {

            dispatch(setShowRgisterModal());

        }
    };

    /*===========================================*/

    // find the quantity of the product that match with param id
    useEffect(() => {

        const findSingleProductQty = userCart?.find(p => p.product._id === id);

        setQuantity(findSingleProductQty?.quantity);

    }, [userCart, product, quantity])

    /*===========================================*/

    // if (loading) return <Spinner />;
    return (
        <div className="item-details">
            <div className="myContainer">
                <div className="item-details-content">
                    <div className="add-to-cart-banner" style={{ visibility: inCart ? "visible" : "hidden" }}>
                        <p className="mb-0">
                            “<span className="text-capitalize">{product?.name}</span>” has been added to your cart.
                        </p>
                        <Link to="/cart">View cart</Link>
                    </div>
                    <div className="item-details-top">
                        <div className="left">
                            <div>
                                {product?.newPrice !== 1 ? <span>Sale!</span> : ""}
                                <img src={product?.image?.url} alt={product?.name} />
                            </div>
                        </div>
                        {/* end left */}
                        <div className="right">
                            <h1 className="text-capitalize">{product?.name}</h1>
                            {
                                // if no rating show [no rating yet],otherwise show the rating div
                                product?.numReviews ?
                                    <div className="product-rating">
                                        <div style={{ marginRight: "5px" }}>
                                            <ul style={{ width: `${(product?.ratings / 5) * 100}%` }}>
                                                <li><LiaStarSolid /></li>
                                                <li><LiaStarSolid /></li>
                                                <li><LiaStarSolid /></li>
                                                <li><LiaStarSolid /></li>
                                                <li><LiaStarSolid /></li>
                                            </ul>
                                        </div>
                                        {/* we use the hashlink in order to jump to the review section in same page */}
                                        <p>(
                                            <HashLink smooth to={`/products/${product?._id}/#reviews`}>
                                                {product?.numReviews} Customer Reviews
                                            </HashLink>
                                            )
                                        </p>
                                    </div> :
                                    <p>No Rating Yet.</p>
                            }
                            <p style={{ color: "var(--light-white)" }}>{product?.description}</p>
                            <div className="item-price">
                                {product?.newPrice !== 1
                                    ?
                                    <>
                                        <span className="text-decoration-line-through text-secondary">
                                            ${product?.price}
                                        </span>
                                        <span className="ms-2">${product?.newPrice}</span>
                                    </>
                                    :
                                    <>
                                        <span>${product?.price}</span>
                                    </>}
                            </div>
                            <div className="increase">
                                <button
                                    onClick={() => handleDecrementQuantity(product?._id)}
                                // disabled={inCart}
                                >-</button>
                                <input type="number" className="count" value={quantity || "1"} readOnly />
                                <button onClick={() => handleIncrementQuantity(product?._id)}>+</button>
                                <button className="big-btn" onClick={() => addToCartHandler(product?._id)} disabled={inCart}>
                                    {!inCart ? <><FaBasketShopping /> Add to Cart</> : "In Cart"}
                                    {/* 
                                    add to cart with spinner
                                    {
                                        cartLoading
                                            ? <MySpinner />
                                            :
                                            <>
                                                {!inCart ? <><FaBasketShopping /> Add to Cart</> : "In Cart"}
                                            </>
                                    } */}
                                </button>
                                <button className="heart"><FaHeart /></button>
                            </div>
                            <div className="product-meta">
                                <h6>Category : <Link>{product?.category}</Link></h6>
                                <div className="share  d-flex">
                                    <span style={{ color: "var(--light-white)" }}>Share :</span>
                                    <ul>
                                        <li><Link to=""><FaFacebookF /></Link></li>
                                        <li><Link to=""><FaYoutube /></Link></li>
                                        <li><Link to=""><FaTwitter /></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <ul className="extra-info">
                                <li>Free global shipping on all orders</li>
                                <li>30 days easy returns if you change your mind</li>
                                <li>Order before noon for same day dispatch</li>
                            </ul>
                        </div>
                        {/* end right */}
                    </div>
                    {/* end item details top */}
                    <div className="item-details-bottom">
                        <TabsItemDetailes product={product} />
                    </div>
                    {/* related products */}
                    <RelatedProducts relatedProducts={getFirstFourProducts} />
                </div>
                {/* end item details content */}
            </div>
            {/* show the footer sticky add to cart section*/}
            {product && !inCart ? <StickyAddCart product={product} addToCart={addToCartHandler} isVisible={isVisible} /> : ""}
        </div>
    )
}

export default ItemDetails;