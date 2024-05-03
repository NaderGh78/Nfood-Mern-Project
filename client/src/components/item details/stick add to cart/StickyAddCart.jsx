import "./stickyAddCart.css";
import { LiaStarSolid } from "react-icons/lia";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const StickyAddCart = ({ product, addToCart, isVisible }) => {

    const { image, name, price, newPrice } = product;

    return (
        <div className={isVisible ? "sticky-add-cart slideUp" : "sticky-add-cart slideDown"}>
            <div className="myContainer">
                <div className="sticky-add-cart-content">
                    <div className="left">
                        <div className="image-box">
                            {/* <img src={process.env.PUBLIC_URL + itemImg} alt={itemName} /> */}
                            <img src={image?.url} alt={name} />
                        </div>
                        <div>
                            You're viewing: <span>{name}</span>
                            <div className="d-flex gap-3">
                                <h5>
                                    {newPrice !== 1
                                        ?
                                        <>
                                            <span className="text-decoration-line-through text-secondary">${price}</span>
                                            <span className="ms-2">${newPrice}</span>
                                        </>
                                        :
                                        <>
                                            <span>${price}</span>
                                        </>}
                                </h5>
                                <ul>
                                    <li><LiaStarSolid /></li>
                                    <li><LiaStarSolid /></li>
                                    <li><LiaStarSolid /></li>
                                    <li><LiaStarSolid /></li>
                                    <li><LiaStarSolid /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StickyAddCart;