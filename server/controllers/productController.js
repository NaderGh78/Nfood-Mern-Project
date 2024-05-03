const asynHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const path = require("path");
const fs = require("fs");
const { ProductModel, newProductValidate } = require("../models/ProductModel");
const { cloudinaryUploadImage } = require("../utils/cloudinary");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/** 
 * @desc get all products 
 * @route api/products
 * @method Get
 * @access private(only admin) 
*/

const getAllProductsCtrl = asynHandler(

    async (req, res) => {

        // get all users  
        const allUsers = await ProductModel.find();

        res.status(200).json(allUsers);

    }

);

/*===========================================*/

/**
 * @desc get single product
 * @route api/products/:id
 * @method Get
 * @access public  
*/

const getProductCtrl = asynHandler(

    async (req, res) => {

        // 1. get single product by id  
        const product = await ProductModel.findById(req.params.id);

        // 2. check if the product not found , show product [not found] error msg
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }

        // 3. send response to client
        res.status(200).json(product);

    }

);

/*===========================================*/

/** 
 * @desc create new product
 * @route api/products
 * @method Post
 * @access private(only admin) 
*/

const newProductCtrl = asynHandler(

    async (req, res) => {

        // 1. Validation for image
        if (!req.file) {
            return res.status(400).json({ message: "no image provided" });
        }

        // 2. Validation for data
        const { error } = newProductValidate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 3. Upload photo
        const imagePath = path.join(__dirname, `../uploads/${req.file.filename}`);

        const result = await cloudinaryUploadImage(imagePath);

        // 4. Create new post and save it to DB
        const product = await ProductModel.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            /*
            in case the admin dont put new price for the item ,make the [newPrice] instead of null,
            otherwise put the [newPrice] value
            */
            newPrice: !req.body.newPrice ? 1 : req.body.newPrice,
            image: {
                url: result.secure_url,
                publicId: result.public_id,
            },
        });

        // 5. Send response to the client
        res.status(201).json({ product, message: "New Product Added Successfully" });

        // 6. Remove image from the server
        fs.unlinkSync(imagePath);

    }

);

/*===========================================*/

/**
 *@desc delete product
 *@route /api/products/:id
 *@method Delete
 *@access private (admin only) 
*/

const deleteProductCtrl = asynHandler(

    async (req, res) => {

        // 1. get the category from db
        const product = await ProductModel.findById(req.params.id);

        // 2. find the category and delete it,otherwise return msg the category not fond
        if (product) {
            await ProductModel.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "product has been deleted successfully"
            });
        } else {
            res.status(404).json({ message: "product not found" });
        }

    }

);

/*===========================================*/

/**
 *@desc get count products
 *@route /api/products/count
 *@method Get
 *@access public  
*/

const countProductsCtrl = asynHandler(

    async (req, res) => {

        // get the count of the categories
        const count = await ProductModel.countDocuments();

        res.status(200).json(count);

    }

);

/*===========================================*/

module.exports = {
    getAllProductsCtrl,
    getProductCtrl,
    newProductCtrl,
    deleteProductCtrl,
    countProductsCtrl
}