import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "../../utils/request";
import AdminRecentUsers from "./AdminRecentUsers";
import AdminRecentOrders from "./AdminRecentOrders";
import { BsFillTagFill } from "react-icons/bs";
import { FaBurger } from "react-icons/fa6";
import { HiOutlineUserGroup } from 'react-icons/hi';
import { MdFastfood } from "react-icons/md";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminMain = () => {

    const { currentUser } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);

    const [catCount, setCatCount] = useState("");

    const [orderCount, setOrderCount] = useState("");

    const [productCount, setProductCount] = useState("");

    const [customerCount, setCustomerCount] = useState("");

    /*===========================================*/

    // get products count
    const getCustomersCount = async () => {

        try {

            setLoading(true);

            const res = await request.get(`/api/users/profile`,
                {
                    headers: {
                        Authorization: "Bearer " + currentUser.token,
                    },
                }
            );

            if (res && res?.data) {

                const { customersCount } = res?.data;

                setCustomerCount(customersCount);

            }

            setLoading(false);

        } catch (error) {
            console.log(error)
        }
    };

    /*===========================================*/

    const getOrdersCount = async () => {

        try {

            setLoading(true);

            const res = await request.get(`/api/orders`,
                {
                    headers: {
                        Authorization: "Bearer " + currentUser.token,
                    },
                }
            );

            if (res && res?.data) {

                const { ordersCount } = res?.data;

                setOrderCount(ordersCount);

            }

            setLoading(false);

        } catch (error) {
            console.log(error)
        }
    };

    /*===========================================*/

    // get products count
    const getProductsCount = async () => {

        try {

            setLoading(true);

            const res = await request.get(`/api/products`);

            if (res && res?.data) {

                const { productsCount } = res?.data;

                setProductCount(productsCount);

            }

            setLoading(false);

        } catch (error) {
            console.log(error)
        }
    };

    /*===========================================*/

    // get categories count
    const getCatCount = async () => {

        try {

            setLoading(true);

            const res = await request.get(`/api/categories`);

            if (res && res?.data) {

                const { catCount } = res?.data;

                setCatCount(catCount);

            }

            setLoading(false);

        } catch (error) {
            console.log(error)
        }
    };

    /*===========================================*/

    useEffect(() => {
        getCatCount();
        getProductsCount();
        getOrdersCount();
        getCustomersCount();
    }, []);

    /*===========================================*/

    // if (isFetching) return <Spinner />;
    return (
        <div className='admin-main'>
            <div className="admin-main-sections">
                <div className="single-section">
                    <div className="single-section-top">
                        <h4>Products</h4>
                        <span><MdFastfood /></span>
                    </div>
                    {
                        loading ?
                            "loading..." :
                            <span className="text-danger fw-bold h3 h4">
                                {productCount}
                            </span>
                    }
                    <Link to="products">see all products</Link>
                </div>
                <div className="single-section">
                    <div className="single-section-top">
                        <h4>Orders</h4>
                        <span><FaBurger /></span>
                    </div>
                    {
                        loading ?
                            "loading..." :
                            <span className="text-danger fw-bold h3 h4">
                                {orderCount}
                            </span>
                    }
                    <Link to="orders">see all orders</Link>
                </div>
                <div className="single-section">
                    <div className="single-section-top">
                        <h4>Customers</h4>
                        <span><HiOutlineUserGroup /></span>
                    </div>
                    {
                        loading ?
                            "loading..." :
                            <span className="text-danger fw-bold h3 h4">
                                {customerCount}
                            </span>
                    }
                    <Link to="customers">see all customers</Link>
                </div>
                <div className="single-section">
                    <div className="single-section-top">
                        <h4>Categories</h4>
                        <span><BsFillTagFill /></span>
                    </div>
                    {
                        loading ?
                            "loading..." :
                            <span className="text-danger fw-bold h3 h4">
                                {catCount}
                            </span>
                    }
                    <Link to="categories">see all categories</Link>
                </div>
            </div>
            <div className="recents">
                <AdminRecentUsers />
                <AdminRecentOrders />
            </div>
        </div>
    )
}

export default AdminMain;