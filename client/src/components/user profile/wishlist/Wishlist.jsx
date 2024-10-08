import "./wishlist.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserWishlists } from "../../../redux/apiCalls/wishlistApiCall";
import { addToCart, getAllUserCart } from "../../../redux/apiCalls/cartApiCall";
import { setShowModal } from "../../../redux/slices/modalSlice";
import { request, userRequest } from "../../../utils/request";
import SingleWishList from "./SingleWishList";
import swal from "sweetalert";
import Spinner from "../../common/spinner/Spinner";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Wishlist = () => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const { userCart } = useSelector((state) => state.cart);

    const { userWishlist } = useSelector((state) => state.wishlist);

    const [products, setProducts] = useState([]);

    const [loadingProductId, setLoadingProductId] = useState(null);

    const [localWishlist, setLocalWishlist] = useState(userWishlist);

    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    /*===========================================*/

    // Fetch products
    useEffect(() => {

        const getProducts = async () => {

            setLoading(true);

            try {

                const res = await request.get(`/api/products`);

                if (res && res?.data) {

                    setProducts(res?.data.products);

                }

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        getProducts();

    }, []);

    /*===========================================*/

    useEffect(() => {

        if (currentUser) {

            dispatch(fetchUserWishlists(id));

            dispatch(getAllUserCart());

        }

    }, [currentUser, dispatch]);

    /*===========================================*/

    // Update local wishlist when userWishlist changes
    useEffect(() => {
        setLocalWishlist(userWishlist);
    }, [userWishlist]);

    /*===========================================*/

    // get the products that match userWishlist
    const wishlistProducts = products?.filter(product =>
        localWishlist.includes(product?._id)
    );

    /*===========================================*/

    // add wishlist to cart
    const addWishlistToCartHandler = async (productId) => {

        setLoadingProductId(productId);

        try {

            await dispatch(addToCart({ productId, quantity: 1 }));

            await dispatch(getAllUserCart());

            dispatch(setShowModal());

        } catch (error) {

            console.error('Failed to add to cart', error);

        } finally {

            setLoadingProductId(null);

        }

    };

    /*===========================================*/

    // Remove item from wishlist handler
    const removeItemFromWishlistHandler = async (userId, productId) => {

        try {

            const res = await userRequest.delete(`/api/users/wishlist`, {
                data: { userId, productId }
            });

            if (res.status === 200) {

                setLocalWishlist(prevWishlist => prevWishlist.filter(id => id !== productId));

                console.log('Item successfully removed from wishlist');

            } else {

                console.error('Failed to remove item:', res.status, res.statusText);

            }

        } catch (error) {

            console.error('Error removing from wishlist:', error);

        }

    };

    /*===========================================*/

    // Delete item Handler
    const deleteItemHandler = (userId, productId) => {
        swal({
            title: "Are you sure to delete this item ?",
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {
            if (isOk) {
                removeItemFromWishlistHandler(userId, productId)
            }
        });
    };

    /*===========================================*/

    return (
        <div className="wishlist">
            <h2 className='tab-title'>Wishlist History</h2>
            {
                loading ? (<Spinner />) :
                    wishlistProducts?.length > 0 ? (
                        wishlistProducts.map((el) => (
                            <SingleWishList
                                data={el}
                                key={el._id}
                                currentUser={currentUser}
                                onAddToWishlist={addWishlistToCartHandler}
                                onRemoveFromWishlist={deleteItemHandler}
                                loading={loadingProductId === el._id}
                                userCart={userCart}
                            />
                        ))
                    ) :
                        (<h5 className="noWishlist">No wishlist yet.</h5>)
            }
        </div>
    );
};

export default Wishlist;  