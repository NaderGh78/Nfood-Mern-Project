import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa6";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Login = () => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const { loading } = useSelector(state => state.auth);

    const navigate = useNavigate();

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
    // if (currentUser) {
    //     swal({
    //         title: "You Logged Successfully Go Home Page",
    //         icon: "success"
    //     }).then(isOk => {
    //         if (isOk) {
    //             navigate("/");
    //         }
    //     })
    // }
    /*===========================================*/

    // in case exist user navigate to home page , otherwise go to login page
    useEffect(() => {

        if (currentUser) {

            navigate("/");

        } else {

            navigate("/login");

        }

    }, [currentUser, navigate]);

    /*===========================================*/

    return (
        <div className="login">
            <div className="my-form">
                <h2 className="form-title">Create An Account <Link to="/">Back Home</Link></h2>
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
                <p className="text-center" style={{ color: "var(--light-white)" }}>
                    Don't have an account?{" "}
                    {/* prevent to show the modal when back */}
                    <Link
                        to="/register"
                        style={{ color: "#ff6868" }}
                    >Signup Now</Link>
                </p>
                <ul>
                    <li><Link><FaGoogle /></Link></li>
                    <li><Link><FaFacebookF /></Link></li>
                    <li><Link><FaTwitter /></Link></li>
                </ul>
            </div>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default Login;