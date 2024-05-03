import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import { LiaEye } from "react-icons/lia";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminOrdersTable = () => {

    const orders = [
        {
            id: 1,
            username: "salim salim",
            userOrder: "sushi",
            userImage: "/assets/images/review.png",
            orderImage: "/assets/images/big.png",
            orderCat: "pizza",
            email: "hello@gmail.com"
        },

        {
            id: 2,
            username: "dani dani",
            userOrder: "sushi",
            userImage: "/assets/images/review.png",
            orderImage: "/assets/images/big.png",
            orderCat: "pizza",
            email: "dani@gmail.com"
        },
        {
            id: 3,
            username: "mike mike",
            userOrder: "sushi",
            userImage: "/assets/images/review.png",
            orderImage: "/assets/images/big.png",
            orderCat: "pizza",
            email: "mike@gmail.com"
        },
        {
            id: 4,
            username: "maged maged",
            userOrder: "sushi",
            userImage: "/assets/images/review.png",
            orderImage: "/assets/images/big.png",
            orderCat: "pizza",
            email: "maged@gmail.com"
        },
        {
            id: 5,
            username: "wael wael",
            userOrder: "sushi",
            userImage: "/assets/images/review.png",
            orderImage: "/assets/images/big.png",
            orderCat: "pizza",
            email: "wael@gmail.com"
        },
        {
            id: 6,
            username: "sami sami",
            userOrder: "sushi",
            userImage: "/assets/images/review.png",
            orderImage: "/assets/images/big.png",
            orderCat: "pizza",
            email: "sami@gmail.com"
        },
        {
            id: 7,
            username: "fawzet fawzet",
            userOrder: "sushi",
            userImage: "/assets/images/review.png",
            orderImage: "/assets/images/big.png",
            orderCat: "pizza",
            email: "fawzet@gmail.com"
        },
        {
            id: 8,
            username: "adnan adnan",
            userOrder: "sushi",
            userImage: "/assets/images/review.png",
            orderImage: "/assets/images/big.png",
            orderCat: "pizza",
            email: "adnan@gmail.com"
        }
    ];

    /*===========================================*/

    return (
        <div className='table-box mb-5'>
            <h2 style={{ color: "var(--dark)" }}>All Orders</h2>
            <table className="table table-hover table-bordered table-transparent">
                <thead>
                    <tr>
                        <th scope="col" className='text-center'>#</th>
                        <th scope="col" className='text-center'>User</th>
                        <th scope="col" className='text-center'>Order</th>
                        <th scope="col" className='text-center'>Order Image</th>
                        <th scope="col" className='text-center'>Category</th>
                        <th scope="col" className='text-center text-nowrap'>Order At</th>
                        <th scope="col" className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.length > 0
                        ? orders?.map((el, idx) => (
                            <tr key={idx}>
                                <th scope="row" className='text-center'>{idx + 1}</th>
                                <td className='text-capitalize bg-danger text-center'>
                                    {el.userImage &&
                                        <img
                                            src={process.env.PUBLIC_URL + el.userImage}
                                            alt="user image"
                                            className="d-block mx-auto"
                                            style={{ width: "33px", height: "33px" }}
                                        />}
                                    <span
                                        className="ms-2 text-nowrap"
                                        style={{ color: "red" }}
                                    >{el.username}</span>
                                </td>
                                <td className='text-center'>{el.userOrder}</td>
                                <td className='text-center'>
                                    <img
                                        src={process.env.PUBLIC_URL + el.orderImage}
                                        alt="post image"
                                        className="d-block mx-auto"
                                        style={{ width: "100px", height: "90px", objectFit: "contain", borderRadius: "50%" }}
                                    />
                                </td>
                                <td className='text-center'>{el.orderCat}</td>
                                <td className='text-center text-nowrap'>24/2/2022</td>
                                <td className='text-center text-nowrap'>
                                    <Link
                                        to="/"
                                        className='btn btn-small bg-success rounded-0 text-white me-1'
                                    >
                                        <LiaEye />
                                    </Link>

                                    <button
                                        className='btn btn-small bg-danger rounded-0 text-white'
                                    // onClick={() => handleDelete(el._id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                        :
                        <>
                            <tr className='text-center'>
                                <td colSpan="7"><h2>No Order Yet!</h2></td>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminOrdersTable;