const router = require("express").Router();
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
    verifyTokenAndOnlyUser
} = require("../middlewares/verifyToken");

const { validateObjectId } = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");

const {
    getAllUsersCtrl,
    profilePhotoUploadCtrl,
    updatePasswordCtrl,
    getUserCtrl,
    updateUserCtrl,
    deleteUserCtrl
} = require("../controllers/userController");

/*===========================================*/
/*===========================================*/
/*===========================================*/

//  /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl);

/*===========================================*/

// /api/users/profile/profile-photo-upload
router
    .route("/profile/profile-photo-upload")
    .post(verifyToken, photoUpload.single("image"), profilePhotoUploadCtrl);

/*===========================================*/

//  /api/users/profile/update-password
router.route("/profile/update-password/:id").put(verifyTokenAndOnlyUser, updatePasswordCtrl);

/*===========================================*/

// /api/users/profile/:id
router.route("/profile/:id")
    .get(verifyTokenAndAuthorization, getUserCtrl)
    .put(verifyTokenAndOnlyUser, updateUserCtrl)
    .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserCtrl);

/*===========================================*/

module.exports = router;