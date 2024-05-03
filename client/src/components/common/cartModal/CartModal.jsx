import './cartModal.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserCart, removeSingleCart } from '../../../redux/apiCalls/cartApiCall';
import { setHideModal, setShowModal } from '../../../redux/slices/modalSlice';
import CartModalSingle from './CartModalSingle';
import Modal from 'react-bootstrap/Modal';
import { FaXmark } from "react-icons/fa6";
import swal from "sweetalert";

/*======================================*/
/*======================================*/
/*======================================*/

const CartModal = () => {

    const dispatch = useDispatch();

    const { userCart, totalCart } = useSelector((state) => state.cart);

    // make the first product at the top element in table 
    let reversedUserCart = [...userCart].reverse();

    /*===========================================*/

    // get the user cart to draw the [cart modal]
    const getUserCart = () => {
        dispatch(getAllUserCart());
    }

    useEffect(() => {
        getUserCart();
    }, [userCart])

    /*===========================================*/

    // Delete item Handler
    const deleteItemHandler = (productId) => {
        swal({
            title: "Are you sure to delete this item ?",
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {
            if (isOk) {
                dispatch(removeSingleCart(productId));
            }
        });
    };

    /*===========================================*/

    return (
        <div className='cart-modal'>
            <div className="cart-modal-box">
                <Modal
                    show={setShowModal}
                    onHide={setHideModal}
                    className='cart-modal-Modal'
                    backdrop="static"
                >
                    <div className="top-heading-title d-flex align-items-center justify-content-between text-white p-3 bg-dark">
                        <h3 className='mb-0'>SHOPPING CART</h3>
                        <span onClick={() => dispatch(setHideModal())}>
                            <FaXmark />
                        </span>
                    </div>
                    <Modal.Body>
                        {reversedUserCart && reversedUserCart.length ?
                            <div>
                                <div className="cart-products-content">
                                    {reversedUserCart.map((el, i) => (
                                        <CartModalSingle data={el} key={i} onDelete={deleteItemHandler} />
                                    ))}
                                </div>
                                {/* cart poroducts content end */}
                                <div className="cart-box-footer">
                                    <div className="total-price">
                                        <h4 className='mb-0'>Total Price</h4>
                                        <span>${(totalCart).toFixed(2)}</span>
                                    </div>
                                    <Link
                                        to="/checkout"
                                        onClick={() => dispatch(setHideModal())}
                                        className='checkout-btn'
                                    >Checkout</Link>
                                    <Link
                                        to="/cart"
                                        onClick={() => dispatch(setHideModal())}
                                    >View cart</Link>
                                </div>
                                {/* cart box footer end */}
                            </div>
                            :
                            <div className='cart-is-empty'>
                                <h6>Your cart is empty.</h6>
                                <Link
                                    to="/menu"
                                    onClick={() => dispatch(setHideModal())}
                                >Return to Menu</Link>
                            </div>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default CartModal;