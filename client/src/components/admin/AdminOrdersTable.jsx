import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "../../utils/request";
import { FaTrash } from "react-icons/fa6";
import { LiaEye } from "react-icons/lia";
import moment from 'moment';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminOrdersTable = () => {

    const { currentUser } = useSelector((state) => state.auth);

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(false);

    /*===========================================*/

    useEffect(() => {

        const getAllOrders = async () => {

            try {

                setLoading(true);

                const res = await request.get(`/api/orders`,
                    {
                        headers: {
                            Authorization: "Bearer " + currentUser.token,
                        },
                    }
                );

                if (res && res?.data?.allOrders) {

                    const { allOrders } = res?.data;

                    setOrders(allOrders);

                }

                setLoading(false);

            } catch (error) {
                console.log(error)
            }
        };

        getAllOrders();

    }, []);

    /*===========================================*/

    return (
        <div className='table-box mb-5'>
            <h2 style={{ color: "var(--dark)" }}>All Orders</h2>
            <table className="table table-hover table-bordered table-transparent">
                <thead>
                    <tr>
                        <th scope="col" className='text-center'>Order id</th>
                        <th scope="col" className='text-center'>User id</th>
                        <th scope="col" className='text-center'>Email</th>
                        <th scope="col" className='text-center'>Amount</th>
                        <th scope="col" className='text-center'>Date</th>
                        <th scope="col" className='text-center text-nowrap'>Status</th>
                        <th scope="col" className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.length > 0
                        ? orders?.map((el, idx) => (
                            <tr key={idx}>
                                <th scope="row" className='text-center'>{el._id}</th>
                                <td className='text-capitalize bg-danger text-center'>{el.userInfo?._id}</td>
                                <td className='text-center'>{el.userInfo?.email}</td>
                                <td className='text-center'>{el.totalAmount}</td>
                                <td className='text-center text-nowrap'>
                                    {moment(el.createdAt).format().slice(0, 16).replace("T", " ")}
                                </td>
                                <td className='text-center'>{el.status}</td>
                                <td className='text-center text-nowrap'>
                                    <Link
                                        to={el._id}
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