const asynHandler = require("express-async-handler");
const { OrderModel } = require("../models/OrderModel");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/** 
 * @desc get all orders
 * @route api/orders
 * @method Get
 * @access private() 
*/

const getAllOrders = asynHandler(

    async (req, res) => {

        // get all orders and populate the product and userinfo
        const allOrders = await OrderModel
            .find()
            .populate("products.product")
            .populate({ path: 'userInfo', select: '-password' });

        res.status(200).json({
            ordersCount: allOrders.length,
            allOrders
        });
    }

);

/*===========================================*/

/** 
 * @desc get user orders
 * @route api/user-order
 * @method Get
 * @access private() 
*/

const getUserOrders = asynHandler(

    async (req, res) => {

        // get the logged user
        const userId = req.userDecoded.id;

        // get user orders that it status equal [pending] and populate the product
        const orders = await OrderModel
            .find({ userInfo: userId, status: "pending" })
            .sort({ createdAt: -1 })
            .populate("products.product")
            .populate({ path: 'userInfo', select: '-password' });

        res.status(200).json({
            userOrders: orders
        });
    }
);

/*===========================================*/

/** 
 * @desc update order status
 * @route api/orders/:orderId
 * @method Put
 * @access private(only admin) 
*/

const updateOrderStatus = asynHandler(

    async (req, res) => {

        // get the logged user
        const userId = req.userDecoded.id;

        const orderId = req.params.orderId;

        // Validate if the order exists
        const orderInfo = await OrderModel.findById({ _id: orderId });

        if (!orderInfo) {
            return res.status(404).json({ message: "no order exist." })
        }

        // Check if the cart exists
        // const cartInfo = await CartModel.findOne({ userId });

        // if (!cartInfo) {
        //     return res.status(400).json({ message: "No product in cart." })
        // }

        // Update order status
        const updatedOrder = await OrderModel.findByIdAndUpdate({ _id: orderId },
            {
                $set: {
                    status: req.body.status
                }
            }, { new: true }
        )

        // console.log(orderInfo.status); 

        // orderInfo.status !== "initiated" && await CartModel.findByIdAndDelete({ _id: cartInfo._id });

        res.status(200).json({
            message: "Order status updated."
        });
    }
);

/*===========================================*/

module.exports = {
    getAllOrders,
    getUserOrders,
    updateOrderStatus
}