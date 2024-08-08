const OrderUi = ({ data }) => {

    const { product } = data;

    return (
        <div className="order-ui">
            <div className="left">
                <div className="img-box">
                    <img src={product?.image?.url} alt="" />
                </div>
                <div>
                    <h5>{product?.name}</h5>
                    <span>{product?.category}</span>
                    <span>Qty : <strong style={{ color: "var(--pistach)" }}>{data?.quantity}</strong> </span>
                </div>
            </div>
            <div className="right">
                <span className="green-span">
                    {/* 
                        [product?.newPrice === 1] mean NO sale on item, show the PRICE ,
                        otherwise mean that there is SALE on item show the NEW PRICE
                    */}
                    $ {product?.newPrice === 1 ? product?.price : product?.newPrice}
                </span>
            </div>
        </div>
    )
}

export default OrderUi;