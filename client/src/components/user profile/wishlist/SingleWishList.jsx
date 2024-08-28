import { Link } from "react-router-dom";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const SingleWishList = ({ data }) => {

    const { _id, name, image, price, newPrice } = data;

    /*===========================================*/

    return (
        <div className="single-wishlist">
            <div className="left">
                <div className="img-handler">
                    <img src={image?.url} alt={name} />
                </div>
            </div>
            <div className="right">
                <ul>
                    <li><Link to={`/products/${_id}`}>{name}</Link></li>
                    <li>
                        {newPrice !== 1
                            ? <>
                                <span className="text-decoration-line-through text-secondary">${price}</span>
                                <span className="ms-2">${newPrice}</span>
                            </>
                            : <span>${price}</span>}
                    </li>
                    <li>August 20, 2024</li>
                </ul>
                <button>Add to Cart</button>
            </div>
        </div>
    )
}

export default SingleWishList;