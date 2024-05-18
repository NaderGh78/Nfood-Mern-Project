import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    hideProductDetailsModal,
    hideProductModal,
    showProductDetailsModal,
    showProductModal
} from "../../redux/slices/productSlice";
import { request } from "../../utils/request";
import AdminProductModal from "./AdminProductModal";
import AdminProductDetailsModal from "./AdminProductDetailsModal";
import { FaTrash } from "react-icons/fa6";
import { LiaEye } from "react-icons/lia";
import { toast } from "react-toastify";
import swal from "sweetalert";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminProducts = () => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const { productModal, ProductDetailsModal, isProductCreated } = useSelector((state) => state.product);

    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState({});

    const [isDelete, setIsDelete] = useState(false);

    /*===========================================*/

    // get all products to draw the table ui
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

    }, [isDelete, productModal, isProductCreated]);

    /*===========================================*/

    // open product details modal
    const openSingleProductModal = (id) => {

        const getProduct = async () => {

            try {

                const { data } = await request.get(`/api/products/${id}`);

                setProduct(data);

            } catch (error) {
                console.log(error)
            }
        };

        getProduct();

        dispatch(showProductDetailsModal());
    }

    /*===========================================*/

    // delete product handler
    const deleteProductHandler = (id) => {

        const singleProduct = products.find(el => el._id === id);

        const txt = singleProduct.name;

        swal({
            title: `Are you sure you want to delete [${txt}] ?`,
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {

            if (isOk) {

                const deleteProduct = async () => {

                    try {

                        setIsDelete(false);

                        const { data } = await request.delete(`/api/products/${id}`, {
                            headers: {
                                Authorization: "Bearer " + currentUser.token,
                            }
                        });

                        toast.success(data?.message);

                        setIsDelete(true);

                    } catch (error) {
                        console.log(error)
                    }
                };

                deleteProduct();

            }
        });
    };

    /*===========================================*/

    // if (loading) return <Spinner />;
    return (
        <div className='table-box'>
            <div className="headTitle d-flex align-items-center justify-content-between mb-3">
                <h1 className="h2 text-capitalize" style={{ color: "var(--dark)" }}>all products</h1>
                <button
                    className='btn btn-success rounded-1'
                    onClick={() => { dispatch(showProductModal()) }}
                >Add New</button>
            </div>
            <table className="table table-hover table-bordered table-transparent">
                <thead>
                    <tr>
                        <th scope="col" className='text-center'>#</th>
                        <th scope="col" className='text-center'>Name</th>
                        <th scope="col" className='text-center'>Image</th>
                        <th scope="col" className='text-center'>Description</th>
                        <th scope="col" className='text-center'>Category</th>
                        <th scope="col" className='text-center'>Price</th>
                        <th scope="col" className='text-center'>New Price</th>
                        <th scope="col" className='text-center'>Created At</th>
                        <th scope="col" className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0
                        ? products.map((el, idx) => (
                            <tr key={idx}>
                                <th scope="row" className='text-center'>{idx + 1}</th>
                                <td className='text-center text-capitalize'>{el.name}</td>
                                <td className='text-center text-capitalize'>
                                    <img src={el.image?.url} alt={el.name} style={{ width: "80px", height: "80px" }} />
                                </td>
                                <td className='text-center text-capitalize'>
                                    {el.description?.length > 40 ? el.description?.slice(0, 41) + "..." : el.description}
                                </td>
                                <td className='text-center text-capitalize'>{el.category}</td>
                                <td className='text-center text-capitalize'>{el.price}</td>
                                <td className='text-center text-capitalize'>{el.newPrice === 1 ? "null" : el.newPrice}</td>
                                <td className='text-center text-capitalize'>{new Date(el.createdAt).toDateString()}</td>
                                <td className='text-center text-nowrap'>
                                    <Link
                                        // to={`/profile/${el._id}/account`}
                                        className='btn btn-small bg-success rounded-0 text-white me-1'
                                        onClick={() => openSingleProductModal(el._id)}
                                    >
                                        <LiaEye />
                                    </Link>
                                    <button
                                        className='btn btn-small bg-danger rounded-0 text-white'
                                        onClick={() => deleteProductHandler(el._id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                        :
                        <>
                            <tr className='text-center'>
                                <td colSpan="9"><h5>No Product Yet,Add One !</h5></td>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
            {/* [add new] product modal */}
            <AdminProductModal
                show={productModal}
                onShowModal={showProductModal}
                onHideModal={hideProductModal}
            />
            {/* view product details modal */}
            <AdminProductDetailsModal
                show={ProductDetailsModal}
                onShowModal={showProductDetailsModal}
                onHideModal={hideProductDetailsModal}
                product={product}
            />
        </div>
    )
}

export default AdminProducts;