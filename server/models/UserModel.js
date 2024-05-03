const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { Schema, model } = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

/*===========================================*/
/*===========================================*/
/*===========================================*/

// User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    address: {
        type: String,
        default: "Lebanon",
        required: false,
        trim: true,
        minlength: 2,
        maxlength: 200,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        default: "Male"
    },
    dob: {
        type: String,
        required: false,
        trim: true,
        default: "2000-01-05"
    },
    password: {
        type: String,
        required: false,//here false,in validate password function will be true
        trim: true,
        minlength: 8,
    },
    newPassword: {
        type: String,
        required: false,//here false,in validate password function will be true
        trim: true,
        minlength: 8,
    },
    confPassword: {
        type: String,
        required: false,//here false,in validate password function will be true
        trim: true,
        minlength: 8,
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
            publicId: null,
        }
    },
    bio: {
        type: String,
        default: "About me",
        minlength: 2,
        maxlength: 300,
    },
    phone: {
        type: String,
        match: /^(961(3|70|71|81)|(03|70|71|81))\d{6}$/,
        default: "03123456"
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    cartId: {
        type: ObjectID,
        ref: "Cart"
    },
}, {
    timestamps: true
});

/*===========================================*/

// Generate Token
UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY);
}

// User Model
const UserModel = model("User", UserSchema, "User");

/*===========================================*/

// Validate Register User
function validateRegisterUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        address: Joi.string().trim().min(2).max(200).allow(""),
        password: Joi.string().trim().min(8).required()
    });
    return schema.validate(obj);
}

// Validate Login User
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required()
    });
    return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).allow(""),
        email: Joi.string().trim().min(5).max(100).email().allow(""),
        address: Joi.string().trim().min(2).max(200).allow(""),
        gender: Joi.string().valid("Male", "Female").allow(""),
        phone: Joi.string()
            .pattern(/^(961(3|70|71|81)|(03|70|71|81))\d{6}$/)
            .messages({
                "string.pattern.base": "Phone number is invalid."
            })
            .allow(""),
        bio: Joi.string().trim().min(2).max(300).allow(""),
        dob: Joi.string().allow("")
    });
    return schema.validate(obj);
}

// validate update password
function validateUpdatePassword(obj) {
    const schema = Joi.object({
        password: Joi.string().trim().min(8).required(),
        newPassword: Joi.string().trim().min(8).required().label("New Password"),
        confPassword: Joi.string().trim().min(8).required().label("Confirm Password ")
    });
    return schema.validate(obj);
}

/*===========================================*/

module.exports = {
    UserModel,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
    validateUpdatePassword
} 