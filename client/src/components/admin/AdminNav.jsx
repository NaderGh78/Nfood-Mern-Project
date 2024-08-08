import { Link, useLocation } from "react-router-dom";
import { BsFillTagFill } from "react-icons/bs";
import { HiOutlineUserGroup, HiChartPie } from 'react-icons/hi';
import { FaBurger } from "react-icons/fa6";
import { MdFastfood } from "react-icons/md";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminNav = () => {

  const { pathname } = useLocation();

  /*===========================================*/

  return (
    <div className="admin-nav">
      <div className="admin-nav-content">
        <Link to="/" className="back-home">
          <h5 className='my-logo'><span>N</span>Food</h5>
        </Link>
        <ul>
          <li className="dash">
            <Link
              to="/admin"
              className={pathname === "/admin" ? "active" : ""}
            >
              <HiChartPie /> Dashboard
            </Link>
          </li>
          <li className="dash">
            <Link
              to="products"
              className={pathname === "/admin/products" ? "active" : ""}
            >
              <MdFastfood /> Products
            </Link>
          </li>
          <li>
            <Link
              to="orders"
              className={pathname === "/admin/orders" ? "active" : ""}
            >
              <FaBurger /> Orders
            </Link>
          </li>
          <li>
            <Link
              to="customers"
              className={pathname === "/admin/customers" ? "active" : ""}
            >
              <HiOutlineUserGroup /> Customers
            </Link>
          </li>
          <li>
            <Link
              to="categories"
              className={pathname === "/admin/categories" ? "active" : ""}
            >
              <BsFillTagFill /> Categories
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminNav;