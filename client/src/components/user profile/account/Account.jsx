import "./account.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, uploadProfilePhoto } from "../../../redux/apiCalls/profileApiCall";
import { request } from "../../../utils/request";
import { CiImageOn } from "react-icons/ci";
import Spinner from "../../common/spinner/Spinner";
import CustomSpinner from "../../helpers/my spinner/CustomSpinner";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Account = () => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const { isProfilePhotoChanged } = useSelector((state) => state.profile);

    const [profile, setProfile] = useState({});

    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    const [file, setFile] = useState(null);

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [address, setAddress] = useState("");

    const [gender, setGender] = useState("Man");

    const [bio, setBio] = useState("");

    const [phone, setPhone] = useState("");

    const [dob, setDob] = useState("");

    // if the user change his photo
    const [isPhotoChanged, setIsPhotoChanged] = useState(false);

    /*===========================================*/

    // get user profile 
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

    // if there is profile ,update username and email
    useEffect(() => {

        if (profile) {

            setUsername(profile?.username);

            setEmail(profile?.email);

            setDob(profile?.dob);

            setAddress(profile?.address);

            setGender(profile?.gender);

            setPhone(profile?.phone);

            setBio(profile?.bio);

        }
    }, [profile]);

    /*===========================================*/

    // update the rest of profile user info
    const updateProfileInfoHandler = async (e) => {

        e.preventDefault();

        const updatedUser = { username, email, dob, address, gender, phone, bio }

        dispatch(updateProfile(profile?._id, updatedUser));

        window.scrollTo(0, 0);

    }

    /*===========================================*/

    // change foto handler
    const changePhotoHandler = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("image", file);

        dispatch(uploadProfilePhoto(formData));

    };

    /*===========================================*/

    if (loading) return <Spinner />;
    return (
        <div className="account">
            <h2 style={{ color: "var(--dark)" }}>Account infomation</h2>
            {
                /*
                just the user himself can see the [form with all inputs] in order the user want to 
                edit his infos like [username,email,address,gender,etc...],
                but when the [admin] need to see the user profile it will display another
                page style that contain the user infos like [username,email,address,gender,etc...] 
                */
                currentUser?._id === profile?._id ?
                    <>
                        <div className="account-box">
                            <div className="left">
                                {/* this form in order to change the user photo */}
                                <form onSubmit={changePhotoHandler}>
                                    <label htmlFor="file">
                                        <div className="img-handler">
                                            {isProfilePhotoChanged && <CustomSpinner width="30" height="30" />}
                                            <img src={currentUser?.profilePhoto?.url} alt="avatar" />
                                            <div className="change-img">
                                                <CiImageOn />
                                                <span className="d-block">change image</span>
                                            </div>
                                        </div>
                                    </label>
                                    <input
                                        style={{ display: "none" }}
                                        type="file"
                                        name="file"
                                        id="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    <button className="upload-profile-photo-btn" type="submit">
                                        Update
                                    </button>
                                </form>
                            </div>
                            {/* end left */}

                            <div className="right">
                                <div className="account-from">
                                    <form onSubmit={updateProfileInfoHandler}>
                                        <div className="form-group">
                                            <label htmlFor="name">Full name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                value={username || ""}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                value={email || ""}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="dob">Date of birth</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="dob"
                                                value={dob || ""}
                                                onChange={(e) => setDob(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                value={address || ""}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="gender">Gender</label>
                                            <select
                                                className="form-control"
                                                id="gender"
                                                value={gender || ""}
                                                onChange={(e) => setGender(e.target.value)}
                                            >
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone">Phone number</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="phone"
                                                value={phone || ""}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="msg">About you</label>
                                            <textarea
                                                className="form-control"
                                                id="msg"
                                                rows="3"
                                                value={bio || ""}
                                                onChange={(e) => setBio(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <button type="submit">Update Account</button>
                                    </form>
                                </div>
                            </div>
                            {/* end right */}
                        </div>
                    </>
                    :
                    <div className="hide-account">
                        <ul>
                            <li>Name : <span>{profile?.username}</span></li>
                            <li>Email : <span>{profile?.email}</span></li>
                            <li>Dob : <span>{profile?.dob}</span></li>
                            <li>Address : <span>{profile?.address}</span></li>
                            <li>Gender : <span>{profile?.gender}</span></li>
                            <li>Phone : <span>{profile?.phone}</span></li>
                            <li>Bio : <span>{profile?.bio}</span></li>
                        </ul>
                        <img src={profile?.profilePhoto?.url} alt="avatar" />
                    </div>
            }
        </div>
    )
}

export default Account;