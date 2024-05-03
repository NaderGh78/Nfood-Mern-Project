import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHideModal } from "../../../redux/slices/modalSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";

/*======================================*/
/*======================================*/
/*======================================*/

const CartModalSingle = ({ data, onDelete }) => {

    const dispatch = useDispatch();

    /*======================================*/

    return (
        <div className='cart-modal-single'>
            <div className="left">
                <span onClick={() => onDelete(data?.product?._id)}>
                    <AiOutlineCloseCircle />
                </span>
                <Link
                    to={`/products/${data?.product?._id}`}
                    className="img-handler"
                    onClick={() => dispatch(setHideModal())}
                >
                    {/* <img src={process.env.PUBLIC_URL + itemImg} alt={itemName} /> */}
                    <img src={data?.product?.image?.url} alt={data?.name} />
                </Link>
            </div>
            <div className="right">
                <h5>
                    <Link to={`/products/${data?.product?._id}`} onClick={() => dispatch(setHideModal())}>
                        {data?.product?.name}
                    </Link>
                </h5>
                <p>
                    {
                        data?.product?.newPrice !== 1 ?
                            <>{data?.quantity} x <span>${data?.product.newPrice}</span> </> :
                            <>{data?.quantity} x <span>${data?.product.price}</span> </>
                    }
                </p>
            </div>
        </div>
    )
}

export default CartModalSingle;