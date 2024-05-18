import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../redux/slices/themeSlice";
import { setShowRgisterModal, setShowModal } from "../../../redux/slices/modalSlice";
import { FaUser, FaShop, FaMagnifyingGlass, FaRegMoon, FaCartShopping } from "react-icons/fa6";
import { LiaSun } from "react-icons/lia";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const FooterBottomMenu = () => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

    const { isDarkMode } = useSelector((state) => state.theme);

    const { userCart } = useSelector((state) => state.cart);

    /*===========================================*/

    // open the [cart modal] based on if there is an user or not
    const openModalHandler = () => {
        if (currentUser) {
            dispatch(setShowModal());
        } else {
            dispatch(setShowRgisterModal());
        }
    }

    /*===========================================*/

    return (
        <div className="footer-bottom-menu">
            <ul>
                {/* 
                    if exist user make the icon inside link and go to admin page 
                    in case the user is admin otherwise go to user account .
                    in case there is noooooo user at all make span with icon with onclick event to open the register modal
                */}
                <li>
                    {
                        currentUser ?
                            <Link to={currentUser?.isAdmin ? "/admin" : `/profile/${currentUser?._id}/account`}><FaUser /></Link>
                            :
                            <span onClick={() => dispatch(setShowRgisterModal())}><FaUser /></span>
                    }
                </li>
                <li><Link to="/menu"><FaShop /></Link></li>
                <li onClick={() => dispatch(toggleTheme())}>
                    {isDarkMode ? <span><FaRegMoon /></span> : <span><LiaSun /></span>}
                </li>
                <li onClick={() => openModalHandler()}>
                    <small>{userCart.length || 0}</small>
                    <span><FaCartShopping /></span>
                </li>
                <li><Link to="/search"><FaMagnifyingGlass /></Link></li>
            </ul>
        </div>
    )
}

export default FooterBottomMenu; 