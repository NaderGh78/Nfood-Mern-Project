const router = require("express").Router();
const photoUpload = require("../middlewares/photoUpload");
const { validateObjectId } = require("../middlewares/validateObjectId");
const { verifyTokenAndAdmin, verifyToken } = require("../middlewares/verifyToken");
const {
    getAllProductsCtrl,
    newProductCtrl,
    getProductCtrl,
    deleteProductCtrl,
    productReviewCtrl,
    deleteSingleReviewCtrl,
    getProductReviewsCtrl
} = require("../controllers/productController");

/*===========================================*/
/*===========================================*/
/*===========================================*/

// /api/products
router.route("/")
    .get(getAllProductsCtrl)
    .post(verifyTokenAndAdmin, photoUpload.single("image"), newProductCtrl);

/*=========================================*/

// /api/products/review
router.route("/review")
    .put(verifyToken, productReviewCtrl)
    .delete(verifyToken, deleteSingleReviewCtrl);

/*=========================================*/

// /api/products/reviews 
router.route("/reviews").get(getProductReviewsCtrl);

/*=========================================*/

// /api/products/:id
router.route("/:id")
    .get(validateObjectId, getProductCtrl)
    .delete(validateObjectId, verifyTokenAndAdmin, deleteProductCtrl);

/*=========================================*/

module.exports = router; 