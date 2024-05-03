import "./password.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePassword } from "../../../redux/apiCalls/profileApiCall";
import { logoutUser } from "../../../redux/apiCalls/authApiCall";
import { request } from "../../../utils/request";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import swal from "sweetalert";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Password = () => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const { isPasswordUpdated } = useSelector((state) => state.profile);

    const [profile, setProfile] = useState({});

    const { id } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confPassword, setConfPassword] = useState("");

    // in order to toggle [show/hide password] icon
    const [currrentPasswordIcon, setCurrrentPasswordIcon] = useState(false);

    const [newPasswordIcon, setNewPasswordIcon] = useState(false);

    /*===========================================*/

    // excute the toggle [show/hide password] icon
    const changeCurrentPassHandler = () => {
        setCurrrentPasswordIcon(!currrentPasswordIcon);
    }

    const changeNewPassHandler = () => {
        setNewPasswordIcon(!newPasswordIcon);
    }

    /*===========================================*/
    // fetch single profile every time changed id
    useEffect(() => {

        const getProfile = async () => {

            try {

                const { data } = await request.get(`/api/users/profile/${id}`,
                    {
                        headers: {
                            Authorization: "Bearer " + currentUser.token,
                        },
                    }
                );

                setProfile(data);

            } catch (error) {
                console.log(error)
            }
        };

        getProfile();

    }, [id]);

    /*===========================================*/

    const updatePasswordHandler = async (e) => {

        e.preventDefault();

        const updatePassword = { password, newPassword, confPassword }

        dispatch(updateProfilePassword(profile?._id, updatePassword));

    }

    /*===========================================*/

    if (isPasswordUpdated) {
        swal({
            title: "Your password updated successfully ,please logout and login with your new password",
            icon: "success"
        }).then(isOk => {
            if (isOk) {
                dispatch(logoutUser())
                navigate("/");
            }
        })
    }

    /*===========================================*/

    return (
        <div className="update-password">
            <h2 style={{ color: "var(--dark)" }}>Update your password</h2>
            <form onSubmit={updatePasswordHandler} className="update-password-form">
                <div className="form-group mt-2">
                    <label className="mb-1" htmlFor='curr-update-pass'>Current Password</label>
                    <div className="position-relative">
                        <input
                            // if currrentPasswordIcon false, change the type of input form[text to password]
                            type={!currrentPasswordIcon ? "password" : "text"}
                            className="form-control"
                            id="curr-update-pass"
                            placeholder="Please enter your current password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            className="span-icon"
                            onClick={changeCurrentPassHandler}
                        >
                            {
                                // here we change the icon form [eye to close eye] icon,based on currIconPassClicked
                                !currrentPasswordIcon ?
                                    <FaEyeSlash />
                                    :
                                    <FaEye />
                            }
                        </span>
                    </div>
                </div>
                <div className="form-group mt-4">
                    <label className="mb-1" htmlFor='new-update-pass'>New Password</label>
                    <div className="position-relative">
                        <input
                            type={!newPasswordIcon ? "password" : "text"}
                            className="form-control"
                            id="new-update-pass"
                            placeholder="Please enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <span
                            className="span-icon"
                            onClick={changeNewPassHandler}
                        >
                            {
                                !newPasswordIcon ?
                                    <FaEyeSlash />
                                    :
                                    <FaEye />
                            }
                        </span>
                    </div>
                </div>
                <div className="form-group mt-4">
                    <label className="mb-1" htmlFor='conf-update-pass'>Confirm Password</label>
                    <div className="position-relative">
                        <input
                            type={!newPasswordIcon ? "password" : "text"}
                            className="form-control"
                            id="conf-update-pass"
                            placeholder="Please confirm your password"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button className="update-btn mt-5">Update Password</button>
            </form>
        </div>
    )
}

export default Password;