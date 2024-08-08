import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyUserCart } from "../../redux/apiCalls/cartApiCall";
import { request, userRequest } from "../../utils/request";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { Spinner } from 'react-bootstrap';
import swal from "sweetalert";

/*======================================*/
/*======================================*/
/*======================================*/

const CheckoutShipping = () => {

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { orderId } = useSelector((state) => state.checkout);

  const [profile, setProfile] = useState({});

  const [paymentType, setPaymentType] = useState("COD");

  const [loading, setLoading] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);

  /*======================================*/

  // get user profile 
  useEffect(() => {

    const getProfile = async () => {

      try {

        setLoading(true);

        const { data } = await request.get(`/api/users/profile/${currentUser?._id}`,
          {
            headers: {
              Authorization: "Bearer " + currentUser?.token,
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

  const confirmOrderHandler = () => {
    swal({
      title: "Are you sure you want to purchase?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {

      if (isOk) {

        const confirmCheckout = async () => {

          try {

            setConfirmLoading(true);

            const reqObj = { paymentType }

            /*
            when click on confirm order btn , it will confirm checkout and confirm 
            the payment type that we given from body
            */
            const res = await userRequest.put(`/api/checkout/${orderId}`, reqObj, {});

            setConfirmLoading(false);

            // if status ok, redirect to confirm page and empty cart
            if (res?.status === 200) {

              navigate("/order-confirm");

              dispatch(emptyUserCart());

            }

          } catch (error) {
            console.log(error)
          }
        };

        confirmCheckout();

      }

    });
  }

  /*======================================*/

  return (
    <div className="checkout-shipping-box">
      <div className="top">
        {
          !loading ?
            <>
              <div className="d-flex align-items-center justify-content-between">
                <h6>Contact</h6>
                <span>{profile?.phone}</span>
                <Link to="/checkout">change</Link>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <h6 className="col-3">Ship to</h6>
                <p className="col-6 text-lowercase">
                  {profile?.city}{" "}{profile?.street}{" "}{profile?.building}{" "}{profile?.apartment}
                </p>
                <Link to="/checkout" className="col-3 text-end">change</Link>
              </div>
            </>
            :
            <Spinner />
        }
      </div>
      <div className="middle mt-3">
        <h6>Payment method</h6>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <select className="form-select" onChange={(e) => setPaymentType(e.target.value)}>
            <option value="COD">Cash on delivery</option>
            <option value="ONLINE">Online</option>
          </select>
        </div>
        <h6>Shipping method</h6>
        <div className="d-flex align-items-center justify-content-between border p-2">
          <p className="mb-0">standard</p>
          <span>$15</span>
        </div>
      </div>
      <div className="bottom-content d-flex align-items-center justify-content-between my-4">
        <Link to="/checkout"><LiaAngleLeftSolid />return to information</Link>
        <button
          type="submit"
          onClick={confirmOrderHandler}
        >
          {
            !confirmLoading ?
              "Confirm order" :
              <>
                <div
                  className="spinner-border"
                  style={{ width: "24px", height: "24px", borderWidth: "2px", color: "#fff" }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
          }
        </button>
      </div>
      <small className="text-secondary mt-2">All Rights Reserved to Nfood team.</small>
    </div>
  )
}

export default CheckoutShipping;