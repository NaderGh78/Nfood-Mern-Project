import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "../../utils/request";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminRecentUsers = () => {

    const { currentUser } = useSelector((state) => state.auth);

    const [profiles, setProfiles] = useState([]);

    /*===========================================*/

    // get all profiles to draw slider ui
    useEffect(() => {

        const getAllUsers = async () => {

            try {

                const res = await request.get(`/api/users/profile`,
                    {
                        headers: {
                            Authorization: "Bearer " + currentUser.token,
                        },
                    }
                );

                if (res && res?.data) {

                    const { allUsers } = res?.data;

                    setProfiles(allUsers);

                }

            } catch (error) {
                console.log(error)
            }
        };

        getAllUsers();

    }, []);

    /*===========================================*/

    // check if the users number is less than 5 show them, otherwise sliced the first 5 users
    const slicedUsers = profiles?.length < 5 ? profiles : profiles?.slice(0, 5);

    return (
        <div className='table-box recent-users'>
            <h2 className="h2 text-capitalize">recent users</h2>
            <table className="table table-hover table-bordered table-transparent mb-0">
                <thead>
                    <tr>
                        <th scope="col" className='text-center' style={{ color: "#e16262" }}>User</th>
                        <th scope="col" className='text-center' style={{ color: "#e16262" }}>#</th>
                        <th scope="col" className='text-center' style={{ color: "#e16262" }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {slicedUsers?.map((el, idx) => (
                        <tr key={idx}>
                            <th scope="row" className='text-center'>{idx + 1}</th>
                            <td className='text-center text-capitalize'>
                                <Link to="/" className="text-decoration-none text-dark">
                                    {el.userImage &&
                                        <img
                                            src={process.env.PUBLIC_URL + el.userImage}
                                            alt="user image"
                                            className="d-block mx-auto"
                                            style={{ width: "33px", height: "33px" }}
                                        />
                                    }
                                </Link>
                                {el.username}
                            </td>
                            <td className='text-center'>
                                <a href={`mailto:${el.email}`} target="_blank">{el.email}</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminRecentUsers;