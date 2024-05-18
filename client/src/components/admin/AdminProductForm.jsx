import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearIsproductCreated, setIsproductCreated } from "../../redux/slices/productSlice";
import { request, userRequest } from "../../utils/request";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminProductForm = () => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const { isProductCreated } = useSelector((state) => state.product);

    const [cat, setCat] = useState([]);

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const [category, setCategory] = useState("");

    const [price, setPrice] = useState("");

    const [newPrice, setNewPrice] = useState("");

    const [file, setFile] = useState(null);

    /*===========================================*/

    // create product handler
    const createProducttHandler = async (e) => {

        e.preventDefault();

        var formData = new FormData();

        formData.append("name", name);

        formData.append("description", description);

        formData.append("category", category);

        formData.append("price", price);

        formData.append("newPrice", newPrice);

        // cos the image is optional , we should check if the there is image upload or not
        formData.append("image", file);

        // add new product
        const addNewProduct = async () => {

            try {

                dispatch(setIsproductCreated());

                const res = await request.post(`/api/products`, formData,
                    {
                        headers: {
                            Authorization: "Bearer " + currentUser.token,
                            "Content-Type": "multipart/form-data",
                        },
                    });

                dispatch(clearIsproductCreated());

                toast.success(res?.data?.message);

                // if create product succefully , reset all inputs
                if (res.status === 201) {

                    setName("");

                    setDescription("");

                    setCategory("");

                    setPrice("");

                    setNewPrice("");

                    setFile("");

                }
            } catch (error) {

                console.log(error);

                toast.error(error?.response?.data?.message);

                dispatch(clearIsproductCreated());

            }
        };

        addNewProduct();

    };

    /*===========================================*/

    // get the categories in order to draw the select with options
    useEffect(() => {

        const getCategories = async () => {

            try {

                const res = await userRequest.get(`/api/categories`);

                if (res && res?.data) {

                    const { categories } = res?.data;

                    setCat(categories);

                }

            } catch (error) {
                console.log(error)
            }
        };

        getCategories();

    }, []);

    /*===========================================*/

    return (
        <div className="admin-product-form">
            <form className="product-form" onSubmit={createProducttHandler}>
                <div className="form-group upload-product-img">
                    <label htmlFor="up">
                        <span><LiaCloudUploadAltSolid /></span>
                        <span>Upload</span>
                    </label>
                    <input
                        type="file"
                        id="up"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <span style={{ color: "var(--pistach)" }}>{file?.name}</span>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="name" className="mb-1">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Type here"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="desc">Product Descritption</label>
                    <textarea
                        className="form-control"
                        id="desc"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write content here"
                    ></textarea>
                </div>

                <div className="form-group flex-inputs">
                    <div>
                        <label htmlFor="cat" className="mb-1">Product Category</label>
                        <select
                            id="cat"
                            className="form-select"
                            defaultValue="default"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option disabled value="default">Select a category</option>
                            {cat?.map(el => (<option value={el.title} key={el._id}>{el.title}</option>))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price" className="mb-1">Product Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            placeholder="Type here"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="newPrice" className="mb-1">Product New Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="newPrice"
                            placeholder="Type here"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit">
                    {isProductCreated
                        ?
                        <>
                            <div
                                className="spinner-border"
                                style={{ width: "24px", height: "24px", borderWidth: "2px", color: "#fff" }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </>
                        :
                        "Add New Product"
                    }
                </button>
            </form>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default AdminProductForm;