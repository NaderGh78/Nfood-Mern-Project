const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectID = mongoose.Schema.Types.ObjectId;

/*===========================================*/
/*===========================================*/
/*===========================================*/

const cartSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
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
        totalAmount: { type: Number }
    },
    { timestamps: true }
);

/*===========================================*/

// create Cart model
const CartModel = model("Cart", cartSchema, "Cart");

module.exports = { CartModel } 