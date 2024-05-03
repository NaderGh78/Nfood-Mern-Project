const OrderUi = ({ data: { itemImg, itemName, itemCat, itemPrice, itemQty, sale, itemNewprice } }) => {

    return (
        <div className="order-ui">
            <div className="left">
                <div className="img-box">
                    <img src={itemImg} alt={itemName} />
                </div>
                <div>
                    <h5>{itemName}</h5>
                    <span>{itemCat}</span>
                    <span>Qty : {itemQty}</span>
                </div>
            </div>
            <div className="right">
                <span className="green-span">
                    $ {sale ? itemNewprice : itemPrice}
                </span>
            </div>
        </div>
    )
}

export default OrderUi;