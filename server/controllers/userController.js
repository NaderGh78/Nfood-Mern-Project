const asynHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const path = require("path");
const fs = require("fs");
const { UserModel, validateUpdateUser, validateUpdatePassword } = require("../models/UserModel");
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/** 
 * @desc get all users 
 * @route api/users/profile
 * @method Get
 * @access private(only admin) 
*/

const getAllUsersCtrl = asynHandler(

    async (req, res) => {

        // get all users  
        const allUsers = await UserModel.find().select("-password");

        res.status(200).json({
            customersCount: allUsers.length,
            allUsers
        });

    }

);

/*===========================================*/

/**
 * @desc get user
 * @route api/users/profile/:id
 * @method Get
 * @access private(only admin and user himeself) 
*/

const getUserCtrl = asynHandler(

    async (req, res) => {

        try {

            const user = await UserModel.findById(req.params.id).select("-password");

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json(user);

        } catch (error) {
            return res.status(500).json({ message: "Error fetching user", error: error.message });
        }
    }
);

/*===========================================*/

/**
 * @desc update user
 * @route api/users/profile/:id
 * @method Put
 * @access private(only admin and user himeself) 
*/

const updateUserCtrl = asynHandler(

    async (req, res) => {

        // 1. validation
        const { error } = validateUpdateUser(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await UserModel.findById(req.userDecoded.id);

        // 2. in case user changed his password , hash the password
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        // 3. update user
        const updateUser = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                address: req.body.address,
                apartment: req.body.apartment,
                building: req.body.building,
                street: req.body.street,
                city: req.body.city,
                postalCode: req.body.postalCode,
                gender: req.body.gender,
                bio: req.body.bio,
                phone: req.body.phone,
                dob: req.body.dob,
                password: req.body.password
            }
        }, { new: true });

        // 4. send response to client
        res.status(200).json({ updateUser, message: "your profile updated successfully" });

    }

);

/*===========================================*/

/**
 * @desc update password
 * @route api/users/profile/update-password/:id
 * @method Put
 * @access private(only user himeself) 
*/

const updatePasswordCtrl = asynHandler(

    async (req, res) => {

        const { password, newPassword, confPassword } = req.body;

        const { error } = validateUpdatePassword(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await UserModel.findById(req.params.id);

        if (user) {

            const isMatch = await bcrypt.compare(password, user.password);

            if (password == newPassword) {
                return res.status(400).json({ message: "The new password is the same old password." });
            }

            //Check passwords match
            if (newPassword !== confPassword) {
                return res.status(400).json({ message: "Confirm password, doesn't match with new password." });
            }

            if (isMatch) {

                //Update password for user with new password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user.save();

                    })
                );

                return res.status(200).json({ message: "Your password updated successfully" });

            } else {
                return res.status(400).json({ message: "Current password is not correct." });
            }

        } else {
            return res.status(400).json({ message: "User not found" });
        }

    }

);

/*===========================================*/

/**
 * @desc delete user
 * @route api/users/profile/:id
 * @method Delete
 * @access private (only admin and user himeself) 
*/

const deleteUserCtrl = asynHandler(

    async (req, res) => {

        // 1. get single user by id from db
        const user = await UserModel.findById(req.params.id);

        // 2. if user exists , delte it and show success msg, otherwise show user not found error msg
        if (user) {

            await UserModel.findByIdAndDelete(req.params.id);

            res.status(200).json({ message: "user has been deleted successfully" });

        } else {
            res.status(404).json({ message: "user not found" });
        }

    }

);

/*===========================================*/

/**
 * @desc  Profile Photo Upload
 * @route   /api/users/profile/profile-photo-upload
 * @method  POST
 * @access  private (only logged in user)
*/

const profilePhotoUploadCtrl = asynHandler(

    async (req, res) => {

        // 1. Validation
        if (!req.file) {
            return res.status(400).json({ message: "no file provided" });
        }

        // 2. Get the path to the image
        const imagePath = path.join(__dirname, `../uploads/${req.file.filename}`);

        // 3. Upload to cloudinary
        const result = await cloudinaryUploadImage(imagePath);

        // 4. Get the user from DB
        const user = await UserModel.findById(req.userDecoded.id);

        // 5. Delete the old profile photo if exist
        if (user.profilePhoto?.publicId !== null) {
            await cloudinaryRemoveImage(user.profilePhoto.publicId);
        }

        // 6. Change the profilePhoto field in the DB
        user.profilePhoto = {
            url: result.secure_url,
            publicId: result.public_id,
        };

        await user.save();

        // 7. Send response to client
        res.status(200).json({
            message: "your profile photo uploaded successfully",
            profilePhoto: { url: result.secure_url, publicId: result.public_id },
        });

        // 8. Remvoe image from the server
        fs.unlinkSync(imagePath);

    }

);

/*===========================================*/
/**
 * @desc  User wishlist
 * @route  /api/users/wishlist
 * @method  POST
 * @access  private (only logged in user)
*/

// addToWishlist  
const addToWishlistCtrl = asynHandler(async (req, res) => {

    try {

        const { userId, productId } = req.body;

        const user = await UserModel.findById(userId);

        // Initialize wishlist if it is not present
        if (!user.wishlist) {
            user.wishlist = [];
        }

        if (!user) return res.status(404).json({ error: 'User not found' });

        const index = user.wishlist.indexOf(productId);

        if (index > -1) {

            // Remove product from wishlist 
            user.wishlist.splice(index, 1);

        } else {

            // Add product to wishlist
            user.wishlist.push(productId);

        }

        await user.save();

        res.json(user.wishlist);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/*===========================================*/

/**
 * @desc  get User wishlist
 * @route  /api/users/wishlist/
 * @method  GET
 * @access  private (only logged in user)
*/

const getWishlistCtrl = asynHandler(

    async (req, res) => {

        try {

            const { userId } = req.params;

            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(user.wishlist);

        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
);

/*===========================================*/

/**
 * @desc  delete single User wishlist
 * @route  /api/users/wishlist/
 * @method  DELETE
 * @access  private (only logged in user)
*/

const removeSingleWishlisttCtrl = asynHandler(async (req, res) => {
    try {

        const { userId, productId } = req.body;

        if (!userId || !productId) {

            return res.status(400).json({ error: 'UserId and productId are required' });

        }

        const user = await UserModel.findById(userId);

        if (!user) return res.status(404).json({ error: 'User not found' });

        // Initialize wishlist if it is not present
        if (!user.wishlist) {
            user.wishlist = [];
        }

        const index = user.wishlist.indexOf(productId);

        if (index > -1) {

            // Remove product from wishlist 
            user.wishlist.splice(index, 1);

            await user.save();

            res.status(200).json({ data: user.wishlist, message: "The product was removed from your wishlist successfully." });

        } else {
            res.status(404).json({ message: "The product was already removed." });
        }

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/*===========================================*/

module.exports = {
    getAllUsersCtrl,
    getUserCtrl,
    updateUserCtrl,
    updatePasswordCtrl,
    deleteUserCtrl,
    profilePhotoUploadCtrl,
    addToWishlistCtrl,
    getWishlistCtrl,
    removeSingleWishlisttCtrl
}