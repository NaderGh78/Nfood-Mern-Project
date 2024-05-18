import "./userProfile.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import { request } from "../../utils/request";
import { HeadingBreadcrumb } from "../../allPagesPaths";
import { useTitle } from "../../components/helpers";
import CustomSpinner from "../../components/helpers/my spinner/CustomSpinner";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const UserProfile = () => {

    // get the page title
    useTitle(`Profile - Nfood`);

    /*===========================================*/

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const [profile, setProfile] = useState({});

    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    const { pathname } = useLocation();

    const splitPatname = pathname.split("/")[3];

    /*===========================================*/

    useEffect(() => {

        const getProfile = async () => {

            try {

                setLoading(true);

                const { data } = await request.get(`/api/users/profile/${id}`,
                    {
                        headers: {
                            Authorization: "Bearer " + currentUser.token,
                        },
                    }
                );

                setProfile(data);

                setLoading(false);

            } catch (error) {
                console.log(error)
            }
        };

        getProfile();

    }, [id, currentUser]);

    /*===========================================*/

    return (
        <div className="user-profile">
            <HeadingBreadcrumb breadcrumb="Profile" />
            <div className="myContainer">
                <div className="user-profile-box">
                    <div className="top">
                        <div>
                            <h2>Account</h2>
                            {
                                loading ?
                                    <CustomSpinner width="20" height="20" /> :
                                    <p>
                                        <span className="text-capitalize">{profile?.username},</span>
                                        <span className="text-secondary">{profile?.email}</span>
                                    </p>
                            }
                        </div>
                        {/* 
                            show [logout btn] only for the user himself can logout,
                            because the admin will be allowed to see the user profile ,
                            without see the [logout btn]
                        */}
                        {currentUser?._id === profile?._id && <span onClick={() => dispatch(logoutUser())}>Logout</span>}
                    </div>
                    {/* 
                        in case the admin need to see the user profile , it will not allowed to see
                        the password tab,therfore the [password tab] will be hidden,
                        the ul will be contain 3 list [order,account,wishlist] without [password tab],
                        therfore we make the [width of li] equal 1/3 of the [ul width]
                    */}
                    <ul className={(currentUser?._id !== profile?._id) ? "hide-some-list" : ""}>
                        <li>
                            <Link
                                to={`/profile/${id}`}
                                className={splitPatname === undefined ? "active" : ""}>
                                order
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/profile/${id}/wishlist`}
                                className={splitPatname === "wishlist" ? "active" : ""}>
                                wishlist
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/profile/${id}/account`}
                                className={splitPatname === "account" ? "active" : ""}>
                                account
                            </Link>
                        </li>
                        {
                            // in case the admin want to see user profile , the [password tab] will be hidden
                            currentUser?._id === profile?._id &&
                            <li>
                                <Link
                                    to={`/profile/${id}/password`}
                                    className={splitPatname === "password" ? "active" : ""}>
                                    password
                                </Link>
                            </li>
                        }
                    </ul>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UserProfile; 