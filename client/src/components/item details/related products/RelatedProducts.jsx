import "./relatedProducts.css";
import { SingleCard } from "../../../allPagesPaths";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const RelatedProducts = ({ relatedProducts }) => {
    return (
        <div className="related-products">
            <h3 className="title">You Might Also Like</h3>
            <div className="related-products-box">
                {
                    relatedProducts?.map(el => (
                        <SingleCard product={el} key={el._id} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts;