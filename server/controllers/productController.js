const asynHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const { ProductModel, newProductValidate, newRatingValidate } = require("../models/ProductModel");
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
        const products = await ProductModel.find();

        res.status(200).json({
            productsCount: products.length,
            products
        });

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

        // 1. get the product from db
        const product = await ProductModel.findById(req.params.id);

        // 2. find the product and delete it,otherwise return msg the product not fond
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
 *@desc make product review
 *@route /api/products/review
 *@method Put
 *@access private(only admin and user himself) 
*/

const productReviewCtrl = asynHandler(

    async (req, res) => {

        const { rating, comment, productId } = req.body;

        // 1. Validation for data
        const { error } = newRatingValidate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const product = await ProductModel.findById(productId);

        const review = {
            userId: req.userDecoded.id,
            name: req.userDecoded.username,
            image: req.userDecoded.profilePhoto.url,
            rating: Number(rating),
            comment,
        }

        const alreadyReviewed = product.reviews.find(
            review => review.userId.toString() === req.userDecoded.id.toString()
        )

        if (alreadyReviewed) {

            product.reviews.forEach(review => {

                if (review.userId.toString() === req.userDecoded.id.toString()) {
                    review.rating = rating;
                    review.comment = comment;
                }

            })

            // return res.status(400).json({ message: "Product already reviewed" });

        } else {

            product.reviews.push(review);

            product.numReviews = product.reviews.length;

        }

        product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        let finalProduct = await product.save();

        res.status(200).json({
            message: "Review Added",
            data: { finalProduct }
        });

    }

);

/*===========================================*/

/**
 *@desc delete product review
 *@route /api/products/review?productId&id
 *@method Delete
 *@access private(only admin and user himself) 
*/

const deleteSingleReviewCtrl = asynHandler(

    async (req, res) => {

        const product = await ProductModel.findById(req.query.productId);

        if (!product) {

            return res.status(404).json({ message: "product not found" });

        } else {

            const reviews = product.reviews.filter(
                review => review._id.toString() !== req.query.id.toString()
            )

            const numReviews = reviews.length;

            const ratings = numReviews && product.reviews.reduce((acc, item) => item?.rating + acc, 0) / numReviews;

            let finalProduct = await ProductModel.findByIdAndUpdate(req.query.productId, {
                reviews,
                ratings,
                numReviews
            },
                { new: true }
            )

            console.log(finalProduct);

            res.status(200).json({
                message: "Review delete",
                finalProduct
            })

        }

    }

);

/*===========================================*/

/**
 *@desc get reviews for specific product
 *@route /api/products/reviews
 *@method Get
 *@access public   
*/

const getProductReviewsCtrl = asynHandler(

    async (req, res) => {

        const product = await ProductModel.findById(req.query.id);

        res.status(200).json({ reviews: product.reviews });

    }

);

/*===========================================*/

module.exports = {
    getAllProductsCtrl,
    getProductCtrl,
    newProductCtrl,
    deleteProductCtrl,
    productReviewCtrl,
    deleteSingleReviewCtrl,
    getProductReviewsCtrl
}