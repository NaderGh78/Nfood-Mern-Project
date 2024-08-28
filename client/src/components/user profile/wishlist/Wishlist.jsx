import "./wishlist.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWishlists } from "../../../redux/apiCalls/wishlistApiCall";
import SingleWishList from "./SingleWishList";
import { request } from "../../../utils/request";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Wishlist = () => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const { userWishlist } = useSelector((state) => state.wishlist);

    const [products, setProducts] = useState([]);

    /*===========================================*/

    // get all products to filter with with userWishlist
    useEffect(() => {

        const getProducts = async () => {

            try {

                const res = await request.get(`/api/products`);

                if (res && res?.data) {

                    const { products } = res?.data;

                    setProducts(products);

                }

            } catch (error) {
                console.log(error)
            }
        };

        getProducts();

    }, []);

    /*===========================================*/

    useEffect(() => {

        if (currentUser) {

            dispatch(fetchUserWishlists(currentUser._id));

        }

    }, [currentUser, dispatch]);

    /*===========================================*/

    // Filter products based on wishlist IDs
    const wishlistProducts = products?.filter(product =>
        userWishlist.includes(product?._id)
    );

    console.log(wishlistProducts)

    /*===========================================*/

    return (
        <div>
            {
                !wishlistProducts?.length ?
                    <h5 className="noWishlist">No wishlist yet.</h5> :
                    wishlistProducts.map((el) => (
                        <SingleWishList data={el} key={el._id} />
                    ))
            }
        </div>
    )
}

export default Wishlist;