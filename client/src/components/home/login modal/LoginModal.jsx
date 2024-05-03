import "./loginModal.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHideRgisterModal } from "../../../redux/slices/modalSlice";
import { loginUser } from "../../../redux/apiCalls/authApiCall";
import Modal from 'react-bootstrap/Modal';
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa6";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const LoginModal = () => {

    const dispatch = useDispatch();

    const { currentUser, loading } = useSelector((state) => state.auth);

    const { showModal } = useSelector((state) => state.modal);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    /*===========================================*/

    // close the register modal in case become an user, and empty all inputs fields
    useEffect(() => {
        if (currentUser) {
            dispatch(setHideRgisterModal());
            setEmail("");
            setPassword("");
        }
    }, [currentUser])

    /*===========================================*/

    // Form Submit Handler
    const formSubmitHandler = async (e) => {

        e.preventDefault();

        try {
            dispatch(loginUser({ email, password }));
        } catch (error) {

        }
    };

    /*===========================================*/

    return (
        <div className="login-modal">
            <Modal show={showModal} onHide={() => dispatch(setHideRgisterModal())} animation={false} className="my-modal mt-5">
                <Modal.Header closeButton>
                    <Modal.Title>Please Login!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="my-form">
                        <form onSubmit={formSubmitHandler}>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="mb-1">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="mb-1">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Link to="">Forgot password?</Link>
                            <button type="submit">
                                {loading
                                    ?
                                    <>
                                        <div
                                            className="spinner-border"
                                            style={{ width: "24px", height: "24px", borderWidth: "2px", color: "#fff" }}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </>
                                    :
                                    "Sign In"
                                }
                            </button>
                        </form>
                        <p className="text-center">
                            Don't have an account?{" "}
                            {/* prevent to show the modal when back */}
                            <Link
                                to="/register"
                                style={{ color: "#ff6868" }}
                                onClick={() => dispatch(setHideRgisterModal())}
                            >Signup Now</Link>
                        </p>
                        <ul>
                            <li><Link><FaGoogle /></Link></li>
                            <li><Link><FaFacebookF /></Link></li>
                            <li><Link><FaTwitter /></Link></li>
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default LoginModal;