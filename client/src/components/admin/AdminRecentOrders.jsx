import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "../../utils/request";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminRecentOrders = () => {

  const { currentUser } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);

  /*===========================================*/

  useEffect(() => {

    const getAllOrders = async () => {

      try {

        const res = await request.get(`/api/orders`,
          {
            headers: {
              Authorization: "Bearer " + currentUser.token,
            },
          }
        );

        if (res && res?.data?.allOrders) {

          const { allOrders } = res?.data;

          setOrders(allOrders);

        }

      } catch (error) {
        console.log(error)
      }
    };

    getAllOrders();

  }, []);

  /*===========================================*/

  // check if the orders length is less than 5 show them, otherwise sliced the first 5 orders
  const slicedOrders = orders?.length < 5 ? orders : orders?.slice(0, 5);

  /*===========================================*/

  return (
    <div className='table-box recent-orders'>
      <h2>Recent Orders</h2>
      <table className="table table-hover table-bordered table-transparent mb-0">
        <thead>
          <tr>
            <th scope="col" className='text-center' style={{ color: "#e16262" }}>#</th>
            <th scope="col" className='text-center' style={{ color: "#e16262" }}>User</th>
            <th scope="col" className='text-center' style={{ color: "#e16262" }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {slicedOrders?.map((el, idx) => (
            <tr key={idx}>
              <th scope="row" className='text-center'>{idx + 1}</th>
              <td className='text-center text-capitalize'>
                <Link to="/" className="text-decoration-none text-dark">
                  <img
                    src={el.userInfo?.profilePhoto?.url}
                    alt="user image"
                    className="d-block mx-auto"
                    style={{ width: "33px", height: "33px" }}
                  />
                </Link>
                {el.userInfo?.username}
              </td>
              <td className='text-center'>
                <a href={`mailto:${el.userInfo?.email}`} target="_blank">{el.userInfo?.email}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminRecentOrders;