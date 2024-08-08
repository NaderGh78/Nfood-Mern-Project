import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "../../utils/request";
import Spinner from "../common/spinner/Spinner";
import { toast } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminOrderDetails = () => {

  const { id } = useParams();

  const { currentUser } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);

  const [status, setStatus] = useState("pending");

  const [loading, setLoading] = useState(false);

  const [updateLoading, setUpdateLoading] = useState(false);

  /*===========================================*/

  useEffect(() => {

    const getAllOrders = async () => {

      try {

        setLoading(true);

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

        setLoading(false);

      } catch (error) {
        console.log(error)
      }
    };

    getAllOrders();

  }, []);

  /*===========================================*/

  // get the order based in param id
  const findOrder = orders?.find(el => el._id === id);

  const objDetails = findOrder?.products;

  /*===========================================*/

  const updateOrderStatusHandler = (e) => {

    e.preventDefault();

    const updateStatus = async () => {

      try {

        const reqObj = { status }

        setUpdateLoading(true);

        const res = await request.put(`/api/orders/${id}`, reqObj,
          {
            headers: {
              Authorization: "Bearer " + currentUser.token,
            },
          }
        );

        console.log(res)


        if (res && res?.data) {

          const { message } = res?.data;

          toast.success(message);

        }

        setUpdateLoading(false);

      } catch (error) {
        console.log(error)
      }
    };

    updateStatus();

  }
  /*===========================================*/

  if (loading) return <Spinner />;
  return (
    <div className="admin-order-details">
      <h2 className="border-bottom">Order Details</h2>
      <div className="my-table">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Item Name</th>
              <th scope="col">Item Image</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {
              objDetails?.length > 0 && objDetails?.map((el, idx) => (
                <tr key={idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>{el.product?.name}</td>
                  <td>
                    <img src={el.product?.image?.url} alt={el.product?.name} />
                  </td>
                  <td>{el.quantity}</td>
                  <td>{el.product?.newPrice > 1 ? el.product?.newPrice : el.product?.price}</td>
                  <td>
                    {el.product?.newPrice > 1 ? el.product?.newPrice * el.quantity : el.product?.price * el.quantity}
                  </td>
                </tr>
              ))
            }
            <tr>
              <td colSpan="5"><strong>Total</strong></td>
              <td><strong>${findOrder?.totalAmount}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="status">
        <div className="left">
          <form onSubmit={updateOrderStatusHandler}>
            <h6>Status</h6>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <select
                className="form-select"
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={findOrder?.status}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancel">Cancel</option>
              </select>
            </div>
            <button type="submit">
              {
                !updateLoading ?
                  "Update" :
                  <>
                    <div
                      className="spinner-border"
                      style={{ width: "24px", height: "24px", borderWidth: "2px", color: "#fff" }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </>
              }
            </button>
          </form>
        </div>
        <div className="right">
          <h6>Address</h6>
          <ul>
            <li><span className="fw-bold">City : </span>{findOrder?.userInfo?.city}</li>
            <li><span className="fw-bold">Street : </span>{findOrder?.userInfo?.street}</li>
            <li><span className="fw-bold">Building : </span>{findOrder?.userInfo?.building}</li>
            <li><span className="fw-bold">Apartment : </span>{findOrder?.userInfo?.apartment}</li>
            <li><span className="fw-bold">Phone : </span>{findOrder?.userInfo?.phone}</li>
          </ul>
        </div>
      </div>
      {/* end status */}
    </div>
  )
}

export default AdminOrderDetails;