const asynHandler = require("express-async-handler");
const { OrderModel, validateOrder } = require("../models/OrderModel");
const { CartModel } = require("../models/CartModel");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/** 
 * @desc Initiate Checkout  
 * @route api/checkout
 * @method Post
 * @access private(only user) 
*/

const initiateCheckout = asynHandler(

    async (req, res) => {

        // Validate the request body
        const { error } = validateOrder(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const userId = req.userDecoded.id;

        // Get the cart of the user
        const cartInfo = await CartModel.findOne({ userId });//userId: userId 

        if (!cartInfo) {
            return res.status(400).json({ message: "This user doesn't have any products in the cart." })
        }

        const { products, totalAmount } = cartInfo;

        const { paymentType } = req.body;

        const order = await OrderModel.create({
            userInfo: userId,
            products,
            totalAmount,
            paymentType
        });

        // Populate the user info in the order
        const orderPopulated = await OrderModel
            .findById({ _id: order._id })
            .populate({ path: 'userInfo', select: '-password' });

        return res.status(200).json({
            message: "Checkout initiated successfully.",
            data: { orderId: order._id, orderData: orderPopulated }
        })

    }

);

/*===========================================*/
/** 
 * @desc confirm checkout
 * @route api/:orderId 
 * @method Put
 * @access private(only user) 
*/

const confirmCheckout = asynHandler(

    async (req, res) => {

        // get the logged user
        const userId = req.userDecoded.id;

        // distructe orderId from params
        const { orderId } = req.params;

        // Find the order that matches the ID and has a status of "initiated"
        const orderInfo = await OrderModel.findOne({ _id: orderId, status: "initiated" });

        if (!orderInfo) {
            return res.status(400).json({ message: "Order not found or already confirmed." })
        }

        // Find the cart for the user
        const cartInfo = await CartModel.findOne({ userId });

        if (!cartInfo) {
            return res.status(400).json({ message: "No product in cart." })
        }

        // Update the order status to "pending" and set the payment type
        await OrderModel.findByIdAndUpdate({ _id: orderId }, {
            $set: {
                status: "pending",
                paymentType: req.body.paymentType
            }
        }, { new: true }
        );

        // Remove the cart associated with the user
        await CartModel.findByIdAndDelete({ _id: cartInfo._id });

        return res.status(200).json({ message: "Order confirmed and cart cleared." });

    }

);

/*===========================================*/

module.exports = {
    initiateCheckout,
    confirmCheckout
}