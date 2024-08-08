import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "../../utils/request";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

/*======================================*/
/*======================================*/
/*======================================*/

const CheckoutInformation = () => {

    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.auth);

    const [profile, setProfile] = useState({});

    const [loading, setLoading] = useState(false);

    const [phone, setPhone] = useState("");

    const [username, setUserName] = useState("");

    const [apartment, setApartment] = useState("");

    const [building, setBuilding] = useState("");

    const [street, setStreet] = useState("");

    const [city, setCity] = useState("");

    const [postalCode, setPostalCode] = useState("");

    /*======================================*/

    // get user profile 
    useEffect(() => {

        const getProfile = async () => {

            try {

                setLoading(true);

                const { data } = await request.get(`/api/users/profile/${currentUser?._id}`,
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

    }, [currentUser?._id, currentUser]);

    /*======================================*/

    // if there is profile ,update username and email and other info
    useEffect(() => {

        if (profile) {

            setPhone(profile?.phone);

            setUserName(profile?.username);

            setApartment(profile?.apartment);

            setBuilding(profile?.building);

            setStreet(profile?.street);

            setCity(profile?.city);

            setPostalCode(profile?.postalCode);

        }
    }, [profile]);

    /*======================================*/

    // update profile user info
    const updateProfileInfoHandler = async (e) => {

        e.preventDefault();

        const updatedUser = { phone, username, apartment, building, street, city, postalCode }

        const editProfile = async () => {

            try {

                const res = await request.put(`/api/users/profile/${profile?._id}`, updatedUser,
                    {
                        headers: {
                            Authorization: "Bearer " + currentUser.token,
                        },
                    }
                );

                // if the submit was succesfuly without any errors , navigate to shipping page
                res.status === 200 && navigate(`/checkout/shipping`);


            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }
        };

        editProfile();

    }

    /*======================================*/

    return (
        <div className="checkout-information-box">
            {
                !loading ?
                    <>
                        <form onSubmit={updateProfileInfoHandler}>
                            <h6>Contact</h6>
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingPhone"
                                    placeholder="Phone"
                                    value={phone || ""}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <label htmlFor="floatingPhone">Phone</label>
                            </div>

                            <h6>Shipping address</h6>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingFname"
                                    placeholder="Full Name"
                                    value={username || ""}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <label htmlFor="floatingFname">Full Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingAppart"
                                    placeholder="apartment"
                                    value={apartment || ""}
                                    onChange={(e) => setApartment(e.target.value)}
                                />
                                <label htmlFor="floatingAppart">apartment</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingBulding"
                                    placeholder="building"
                                    value={building || ""}
                                    onChange={(e) => setBuilding(e.target.value)}
                                />
                                <label htmlFor="floatingBulding">building</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingStreet"
                                    placeholder="street"
                                    value={street || ""}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                                <label htmlFor="floatingBulding">street</label>
                            </div>

                            <div className="input-flex-box d-flex gap-5 mt-4">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingCity"
                                        placeholder="street"
                                        value={city || ""}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                    <label htmlFor="floatingCity">city</label>
                                </div>

                                {/* ========================== */}

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="postalCode"
                                        placeholder="Postal Code"
                                        value={postalCode || ""}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    />
                                    <label htmlFor="postalCode">Postal Code</label>
                                </div>
                            </div>

                            <div className="form-check mt-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked" style={{ userSelect: "none" }}>
                                    save this information for next time
                                </label>
                            </div>

                            <div className="bottom-content d-flex align-items-center justify-content-between my-2">
                                <Link to="/cart"><LiaAngleLeftSolid />return to Cart</Link>
                                <button type="submit">Continue to Shipping</button>
                            </div>
                        </form>
                    </>
                    :
                    <Spinner />
            }
        </div>
    )
}

export default CheckoutInformation;