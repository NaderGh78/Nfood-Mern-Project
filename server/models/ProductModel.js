const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const joi = require("joi");
const ObjectID = mongoose.Schema.Types.ObjectId;

/*===========================================*/
/*===========================================*/
/*===========================================*/

const reviewSchema = new Schema({
    userId: {
        type: ObjectID,
        ref: "User",
        required: false
    },
    name: {
        type: String,
        required: true,
    },
    productId: {
        type: String
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    comment: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: true
    },
    image: {
        type: String
    }
},
    {
        timestamps: true
    }
);

/*===========================================*/

const productShema = new Schema({
    userId: {
        type: ObjectID,
        ref: "User",
        required: false
    },
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
    },
    ratings: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    reviews: [reviewSchema],
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

// new product validation func
function newRatingValidate(obj) {

    const shema = joi.object({
        rating: joi.number().min(1).max(5).required(),
        comment: joi.string().trim().min(5).max(200).required(),
        productId: joi.string()
    });

    return shema.validate(obj);

}

/*===========================================*/

// create Product model
const ProductModel = model("Product", productShema, "Product");

module.exports = {
    ProductModel,
    newProductValidate,
    updateProductValidate,
    newRatingValidate
}