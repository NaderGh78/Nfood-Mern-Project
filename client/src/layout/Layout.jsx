import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    CartModal,
    LoginModal,
    MyFooter,
    ScrollToTopWhenNavigatePage,
    TopMenu
} from "../allPagesPaths";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Layout = () => {

    const { pathname } = useLocation();

    const { showCartModal } = useSelector((state) => state.modal);

    // hide the footer and header from [login and register] pages
    const hideHeaderAndFooterForPaths = ['/login', '/register'];

    /*===========================================*/

    return (
        <>
            {!hideHeaderAndFooterForPaths.some(path => pathname.match(path)) && <TopMenu />}
            <Outlet />
            {!hideHeaderAndFooterForPaths.some(path => pathname.match(path)) && <MyFooter />}

            {/* open [login] modal */}
            <LoginModal />

            {/* open [cart] modal */}
            {showCartModal && <CartModal />}

            {/* scrol to top when navigate pages */}
            <ScrollToTopWhenNavigatePage />
        </>
    )
}

export default Layout;