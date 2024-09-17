const asynHandler = require("express-async-handler");
const mongoose = require('mongoose');
const { UserModel } = require('../models/UserModel');
const { OrderModel } = require('../models/OrderModel');
const { CartModel } = require('../models/CartModel');
const { ProductModel } = require('../models/ProductModel');

const cleanupOrphans = asynHandler(async (req, res) => {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // 1. Delete orders associated with the user
        const deletedOrdersResult = await OrderModel.deleteMany({ 'userInfo': userObjectId });
        console.log(`Deleted orders count: ${deletedOrdersResult.deletedCount}`);

        // 2. Delete carts associated with the user
        const deletedCartsResult = await CartModel.deleteMany({ userId: userObjectId });
        console.log(`Deleted carts count: ${deletedCartsResult.deletedCount}`);

        // 3. Update wishlists to remove products that are no longer valid
        const allProducts = await ProductModel.find();
        const productIds = allProducts.map(p => p._id);

        // Use $pull to remove invalid product IDs from the wishlist
        const updateWishlistResult = await UserModel.updateMany(
            { wishlist: { $nin: productIds } },
            { $pull: { wishlist: { $nin: productIds } } }
        );
        const updatedWishlistsCount = updateWishlistResult.nModified;
        console.log(`Updated wishlists count: ${updatedWishlistsCount}`);

        // 4. Update product reviews to remove reviews from deleted users
        const products = await ProductModel.find().populate('reviews.userId');
        let updatedReviewsCount = 0;

        for (const product of products) {
            const validReviews = product.reviews.filter(review => review.userId && !review.userId._id.equals(userObjectId));
            if (validReviews.length !== product.reviews.length) {
                product.reviews = validReviews;
                product.numReviews = validReviews.length;
                product.ratings = validReviews.length > 0 
                    ? validReviews.reduce((acc, item) => acc + (item.rating || 0), 0) / validReviews.length 
                    : 0;
                await product.save();
                updatedReviewsCount += 1;
            }
        }
        console.log(`Updated reviews count: ${updatedReviewsCount}`);

        res?.status(200).json({ message: "Orphan cleanup completed." });

    } catch (error) {
        console.error('Error cleaning up orphaned data:', error);
        res.status(500).json({ message: "Error cleaning up orphaned data", error: error.message });
    }
});

module.exports = {
    cleanupOrphans,
};
