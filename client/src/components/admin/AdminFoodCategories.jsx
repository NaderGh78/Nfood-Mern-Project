import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHideNewCatModal, setShowNewCatModal } from "../../redux/slices/categorySlice";
import { request, userRequest } from "../../utils/request";
import AdminCatModal from "./AdminCatModal";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import swal from "sweetalert";
import Spinner from "../common/spinner/Spinner";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminFoodCategories = () => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const { isCatCreated } = useSelector((state) => state.category);

    const { showNewCatModal } = useSelector((state) => state.category);

    const [cat, setCat] = useState([]);

    const [isDelete, setIsDelete] = useState(false);

    const [loading, setLoading] = useState(false);

    /*===========================================*/

    // fetch all categories
    useEffect(() => {

        const getCategories = async () => {

            setLoading(true);

            try {

                const res = await userRequest.get("/api/categories");

                if (res && res?.data) {

                    const { categories } = res?.data;

                    setCat(categories);

                }

            } catch (error) {
                console.log(error)
            } finally {

                setLoading(false);

            }
        };

        getCategories();

    }, [isDelete, isCatCreated]);

    /*===========================================*/

    // delete category with popup confirm msg
    const handleDeleteCategory = (id) => {

        const singleCategorie = cat.find(el => el._id === id);

        const txt = singleCategorie.title

        swal({
            title: `Are you sure you want to delete [${txt}] ?`,
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {

            if (isOk) {

                const deleteCategory = async () => {

                    try {

                        setIsDelete(false)

                        const { data } = await request.delete(`/api/categories/${id}`, {
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

                deleteCategory();
            }
        });
    };

    /*===========================================*/

    //if (isCatFetching) return <Spinner />;
    return (
        <div className='table-box'>
            <div className="headTitle d-flex align-items-center justify-content-between mb-3">
                <h1 className="h2 text-capitalize" style={{ color: "var(--dark)" }}>all categories</h1>
                <button
                    className='btn btn-success rounded-1'
                    onClick={() => { dispatch(setShowNewCatModal()) }}
                >Add New</button>
            </div>

            {loading ? (
                <div className='text-center'>
                    <Spinner />
                </div>
            ) :
                (
                    <table className="table table-hover table-bordered table-transparent">
                        <thead>
                            <tr>
                                <th scope="col" className='text-center'>#</th>
                                <th scope="col" className='text-center'>Category</th>
                                <th scope="col" className='text-center'>Create At</th>
                                <th scope="col" className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cat.length > 0
                                ? cat.map((el, idx) => (
                                    <tr key={idx}>
                                        <th scope="row" className='text-center'>{idx + 1}</th>
                                        <td className='text-center text-capitalize'>{el.title}</td>
                                        <td className='text-center'>{new Date(el.createdAt).toDateString()}</td>
                                        <td className='d-flex justify-content-center gap-1'>
                                            <button
                                                className='btn btn-small bg-danger rounded-0 text-white'
                                                onClick={() => handleDeleteCategory(el._id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                :
                                <>
                                    <tr className='text-center'>
                                        <td colSpan="4"><h5>No Category Yet,Add One !</h5></td>
                                    </tr>
                                </>
                            }
                        </tbody>
                    </table>
                )
            }

            {/* [add new] category modal */}
            <AdminCatModal
                show={showNewCatModal}
                onShowModal={setShowNewCatModal}
                onHideModal={setHideNewCatModal}
            />
        </div>
    )
}

export default AdminFoodCategories;