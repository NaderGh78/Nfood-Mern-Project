const asynHandler = require("express-async-handler");
const mongoose = require('mongoose');
const { UserModel } = require('../models/UserModel');
const { ProductModel } = require('../models/ProductModel');

/*===========================================*/
/*===========================================*/
/*===========================================*/
//  res.status(200).json({ message: "xxxxxxxxx" });
const cleanupOrphanReviews = asynHandler(

    async (req, res) => {

        try {
            // Fetch all users
            const users = await UserModel.find();
            const validUserIds = users.map(user => user._id.toString());
    
            // Fetch all products
            const products = await ProductModel.find();
    
            for (const product of products) {
                // Filter out reviews with orphaned user IDs
                const filteredReviews = product.reviews.filter(review => validUserIds.includes(review.userId.toString()));
    
                // Recalculate number of reviews and average rating
                const numReviews = filteredReviews.length;
                const ratings = numReviews ? filteredReviews.reduce((acc, item) => acc + (item.rating || 0), 0) / numReviews : 0;
    
                // Update product with cleaned reviews and recalculated values
                product.reviews = filteredReviews;
                product.numReviews = numReviews;
                product.ratings = ratings;
    
                // Save updated product
                await product.save();
            }
    
            res?.status(200).json({ message: "Orphan reviews cleanup completed." });

        } catch (error) {
            console.error('Error cleaning up orphan reviews:', error);
            throw error;
        }
    }
);

/*===========================================*/

module.exports = {
    cleanupOrphanReviews,
}; 