const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const joi = require("joi");

/*===========================================*/
/*===========================================*/
/*===========================================*/

const productShema = new Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 200,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        minlength: 5,
        required: true
    },
    category: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 100,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    newPrice: {
        type: Number,
        default: 1,
        required: false
    },
    image: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
            publicId: null,
        }
    }
}, {
    timestamps: true
});

/*===========================================*/

// new product validation func
function newProductValidate(obj) {

    const shema = joi.object({
        name: joi.string().trim().min(2).max(200).required(),
        description: joi.string().trim().min(5).required(),
        category: joi.string().trim().min(2).max(100).required(),
        price: joi.number().required(),
        newPrice: joi.number().allow("")
    });

    return shema.validate(obj);

}

/*===========================================*/

// update product validation func
function updateProductValidate(obj) {

    const shema = joi.object({
        name: joi.string().trim().min(2).max(200),
        description: joi.string().trim().min(5),
        category: joi.string().trim().min(2).max(100),
        price: joi.number(),
        newPrice: joi.number()
    });

    return shema.validate(obj);

}

/*===========================================*/

// create Product model
const ProductModel = model("Product", productShema, "Product");

module.exports = {
    ProductModel,
    newProductValidate,
    updateProductValidate
}