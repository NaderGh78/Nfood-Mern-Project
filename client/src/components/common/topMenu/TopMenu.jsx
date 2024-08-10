import './topMenu.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from '../../../redux/slices/themeSlice';
import { setShowModal, setShowRgisterModal } from '../../../redux/slices/modalSlice';
import { logoutUser } from '../../../redux/apiCalls/authApiCall';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFilePerson, BsBoxArrowInLeft } from "react-icons/bs";
import { FaRegMoon, FaUser } from "react-icons/fa6";
import { LiaSearchSolid, LiaShoppingCartSolid, LiaSun, LiaHeart } from "react-icons/lia";
import { HiChartPie } from 'react-icons/hi';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const TopMenu = () => {

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);

  const { userCart } = useSelector((state) => state.cart);

  const { isDarkMode } = useSelector((state) => state.theme);

  // in order to make active class when navigate pages
  const [url, setUrl] = useState(null);

  // in order to close the menu and go smoothly when click on link inside it
  const [expanded, setExpanded] = useState(false);

  const location = useLocation("/");

  /*===========================================*/

  // give active class for link depend on location,and change the overflow of body depend is cart modal show or not
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

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
    <div className='topmenu'>
      {/* make at the top of page with fixed-top*/}
      <Navbar expand="lg" className="bg-body-tertiary fixed-top" expanded={expanded}>
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"}>
            <h5 className='my-logo'><span>N</span>Food</h5>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* make the ul in center of navbar with mx-auto*/}
            <Nav className="mx-auto">
              <Nav.Link
                as={Link}
                to={"/"}
                className={url === "/" ? "active" : ""}
                onClick={() => setExpanded(false)}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/menu"}
                className={url === "/menu" ? "active" : ""}
                onClick={() => setExpanded(false)}
              >
                Menu
              </Nav.Link>

              <Nav.Link
                as={Link}
                to={"/about"}
                className={url === "/about" ? "active" : ""}
                onClick={() => setExpanded(false)}
              >
                About
              </Nav.Link>

              <Nav.Link
                as={Link}
                to={"/contact"}
                className={url === "/contact" ? "active" : ""}
                onClick={() => setExpanded(false)}
              >
                Contact
              </Nav.Link>
            </Nav>
            {/* end first nav */}

            {/* ====================== */}

            <>
              {/* toggle dark mode */}
              {
                isDarkMode
                  ?
                  <FaRegMoon
                    className='toggle-icon'
                    onClick={() => {
                      dispatch(toggleTheme())
                      setExpanded(false)
                    }}
                  />
                  :
                  <LiaSun
                    className='toggle-icon'
                    onClick={() => {
                      dispatch(toggleTheme())
                      setExpanded(false)
                    }}
                  />
              }
              <Nav className='second-nav'>
                <Nav.Link
                  as={Link}
                  to={"/search"}
                  className="LinkIcon"
                  onClick={() => setExpanded(false)}
                >
                  <LiaSearchSolid />
                </Nav.Link>

                {/* cart basket with badge */}
                <Nav.Link
                  className="LinkIcon"
                  onClick={() => {
                    setExpanded(false)
                    openModalHandler()
                  }}
                >
                  <span>{currentUser ? userCart?.length : 0}</span>
                  <LiaShoppingCartSolid />
                </Nav.Link>

                {/* +++++++++++++++++++ User Part ++++++++++++++++++++++ */}

                {
                  currentUser ?
                    <>
                      <div className="user-account">
                        <div className="dropdown">
                          <button
                            className="btn btn-white dropdown-toggle d-flex align-items-center"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span><FaUser /></span>
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <div className='dropdown-title'>
                                <img src={currentUser?.profilePhoto?.url} alt="user" />
                                <div>
                                  <h5>{currentUser?.username}</h5>
                                  <p>{currentUser?.email}</p>
                                </div>
                              </div>
                            </li>
                            {
                              // if the current user is admin show this li
                              currentUser?.isAdmin &&
                              <>
                                <li>
                                  <Link
                                    to="/admin"
                                    className="dropdown-item"
                                  ><HiChartPie /> Dashboard</Link>
                                </li>
                              </>
                            }
                            <li>
                              <Link
                                to={`/profile/${currentUser?._id}`}
                                className="dropdown-item"
                              ><LiaShoppingCartSolid /> My Order</Link>
                            </li>

                            <li>
                              <Link
                                to={`/profile/${currentUser?._id}/wishlist`}
                                className="dropdown-item"
                              ><LiaHeart /> Wishlist</Link>
                            </li>

                            <li>
                              <Link
                                to={`/profile/${currentUser?._id}/account`}
                                className="dropdown-item"
                              ><BsFilePerson /> My Account</Link>
                            </li>

                            <li
                              onClick={
                                () => {
                                  dispatch(logoutUser());
                                  // in small screen , close the navbar when logout user
                                  setExpanded(false)
                                }}
                            ><Link className="dropdown-item"><BsBoxArrowInLeft /> Logout</Link></li>
                          </ul>
                        </div>
                      </div>
                    </>
                    :
                    <h6 className="no-user"
                      onClick={() => dispatch(setShowRgisterModal())}
                    >Login</h6>
                }
              </Nav>
            </>
            {/* end second nav */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default TopMenu;