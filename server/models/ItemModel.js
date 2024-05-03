const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectID = mongoose.Schema.Types.ObjectId;

/*===========================================*/
/*===========================================*/
/*===========================================*/

const itemSchema = new Schema({
    owner: {
        type: ObjectID,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})


// create item model
const ItemModel = model("Item", itemSchema, "Item");

module.exports = { ItemModel }