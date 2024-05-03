import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "../../utils/request";
import { FaTrash } from "react-icons/fa6";
import { LiaEye } from "react-icons/lia";
import { toast } from "react-toastify";
import swal from "sweetalert";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminCutomersTable = () => {

    const { currentUser } = useSelector((state) => state.auth);

    const [profiles, setProfiles] = useState([]);

    const [isDelete, setIsDelete] = useState(false);

    /*===========================================*/

    // get all products to draw slider ui
    useEffect(() => {

        const getAllUsers = async () => {

            try {

                const { data } = await request.get(`/api/users/profile`,
                    {
                        headers: {
                            Authorization: "Bearer " + currentUser.token,
                        },
                    }
                );

                setProfiles(data);

            } catch (error) {
                console.log(error)
            }
        };

        getAllUsers();

    }, [isDelete]);

    /*===========================================*/

    // delete user handler
    const handleDeleteUser = (id) => {

        // get the name of user
        const singleUser = profiles.find(el => el._id === id);

        const txt = singleUser.username;

        swal({
            title: `Are you sure you want to delete [${txt}] ?`,
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {

            if (isOk) {

                const deleteSingleProfile = async () => {

                    try {

                        setIsDelete(false);

                        const { data } = await request.delete(`/api/users/profile/${id}`,
                            {
                                headers: {
                                    Authorization: "Bearer " + currentUser.token,
                                },
                            }
                        );

                        toast.success(data?.message);

                        setIsDelete(true);

                    } catch (error) {
                        console.log(error)
                    }
                };

                deleteSingleProfile();
            }
        });
    };

    /*===========================================*/

    return (
        <div className='table-box'>
            <h2 style={{ color: "var(--dark)" }}>All Cutomers</h2>
            <table className="table table-hover table-bordered table-transparent">
                <thead>
                    <tr>
                        <th scope="col" className='text-center'>#</th>
                        <th scope="col" className='text-center'>Name</th>
                        <th scope="col" className='text-center'>Email</th>
                        <th scope="col" className='text-center'>Address</th>
                        <th scope="col" className='text-center'>Phone</th>
                        <th scope="col" className='text-center'>Role</th>
                        <th scope="col" className='text-center'>Joined at</th>
                        <th scope="col" className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        profiles.length > 0
                            ?
                            profiles.map((el, i) => (
                                <tr key={i}>
                                    <th scope="row" className='text-center'>{i + 1}</th>
                                    <td
                                        className='text-capitalize d-flex flex-column align-items-center'
                                        style={{ color: el.isAdmin ? "red" : "var(--light-white)", whiteSpace: "nowrap" }}
                                    >
                                        <img src={el.profilePhoto.url} alt="user avatar" />
                                        {el.username}
                                    </td>
                                    <td className='text-center'>
                                        <a href={`mailto:${el.email}`} target="_blank">{el.email}</a>
                                    </td>
                                    <td className='text-center'>
                                        {el.address}
                                    </td>
                                    <td className='text-center'>{el.phone}</td>
                                    <td
                                        className='text-center'
                                        style={{ color: el.isAdmin ? "red" : "var(--light-white)" }}
                                    >
                                        {el.isAdmin ? "Admin" : "User"}
                                    </td>
                                    <td className='text-center'>{new Date(el.createdAt).toDateString()}</td>
                                    <td className='text-center text-nowrap'>
                                        <Link
                                            to={`/profile/${el._id}/account`}
                                            className='btn btn-small bg-success rounded-0 text-white me-1'
                                        >
                                            <LiaEye />
                                        </Link>

                                        {/* if the user is admin , hide the delete btn */}
                                        {!el.isAdmin
                                            &&
                                            <>
                                                <button
                                                    className='btn btn-small bg-danger rounded-0 text-white'
                                                    onClick={() => handleDeleteUser(el._id)}
                                                    disabled={el.isAdmin}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            ))
                            :
                            <tr className='text-center'>
                                <td colSpan="8"><h2>No Cutomers Yet!</h2></td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminCutomersTable;