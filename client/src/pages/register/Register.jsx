import "./register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa6";
import swal from "sweetalert";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Register = () => {

    const dispatch = useDispatch();

    const { registerMessage, loading } = useSelector(state => state.auth);

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    /*===========================================*/

    // Form Submit Handler
    const formSubmitHandler = (e) => {

        e.preventDefault();

        dispatch(registerUser({ username, email, password }))

    }

    /*===========================================*/

    // in case there are a succefully register , show swal to navigate to login page
    if (registerMessage) {
        swal({
            title: registerMessage,
            icon: "success"
        }).then(isOk => {
            if (isOk) {
                navigate("/login");
            }
        })
    }

    /*===========================================*/

    return (
        <div className="register">
            <div className="my-form">
                <h2 className="form-title">Create An Account <Link to="/">Back Home</Link></h2>
                <form onSubmit={formSubmitHandler}>

                    <div className="form-group mb-3">
                        <label htmlFor="name" className="mb-1">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email" className="mb-1">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="email"
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
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
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
                            "Sign up"
                        }
                    </button>
                </form>
                <p className="text-center" style={{ color: "var(--light-white)" }}>
                    Have an account?{" "}
                    {/* prevent to show the modal when back */}
                    <Link
                        to="/login"
                        style={{ color: "#ff6868" }}
                    >Login here</Link>
                </p>
                <ul>
                    <li><Link><FaGoogle /></Link></li>
                    <li><Link><FaFacebookF /></Link></li>
                    <li><Link><FaTwitter /></Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Register;