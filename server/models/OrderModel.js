const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Joi = require("joi");
const ObjectID = mongoose.Schema.Types.ObjectId;

/*===========================================*/
/*===========================================*/
/*===========================================*/

const orderSchema = new Schema(
    {
        userInfo: {
            type: ObjectID,
            ref: "User"
        },
        products: [{
            product: {
                type: ObjectID,
                ref: "Product",
            },
            quantity: {
                type: Number,
                default: 0
            },
            price: {
                type: Number,
                default: 1
            }
        }],
        totalAmount: { type: Number },
        paymentType: {
            type: String,
            enum: ["COD", "ONLINE"],
            default: "COD"
        },
        status: {
            type: String,
            enum: ["initiated", "pending", "processing", "completed", "cancel"],
            default: "initiated"
        }
    },
    { timestamps: true }
);

/*===========================================*/
function validateOrder(obj) {

    const schema = Joi.object({

        paymentType: Joi.string().min(3).max(40).required()

    });

    return schema.validate(obj);

}
/*===========================================*/

// create Order model
const OrderModel = model("Order", orderSchema, "Order");

module.exports = {
    OrderModel,
    validateOrder
} 