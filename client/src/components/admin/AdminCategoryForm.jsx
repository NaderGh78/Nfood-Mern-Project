import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearIsCatCreated, setIsCatCreated } from "../../redux/slices/categorySlice";
import { request } from "../../utils/request";
import { toast } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminCategoryForm = () => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const [title, setTitle] = useState("");

    const [newCat, setNewCat] = useState("");

    /*===========================================*/

    // create new product from admin page
    const createNewProductHandler = (e) => {

        e.preventDefault();

        const addNewCategory = async () => {

            try {

                dispatch(setIsCatCreated());

                const res = await request.post("/api/categories", { title },
                    {
                        headers: {
                            Authorization: "Bearer " + currentUser.token,
                        }
                    });

                setNewCat(res?.data);

                toast.success("category created successfully");

                res?.status === 201 && setTitle("")

                dispatch(clearIsCatCreated());

            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        };

        addNewCategory();

    };

    /*===========================================*/

    return (
        <div className="admin-add-category">
            <form onSubmit={createNewProductHandler}>
                <div className="form-group">
                    <label htmlFor="title">Category Title</label>
                    <input
                        type="text"
                        className="form-control my-input mt-1"
                        id="title"
                        placeholder="Enter Category Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn bg-success w-100 text-white mt-4">Add</button>
            </form>
        </div>
    )
}

export default AdminCategoryForm;