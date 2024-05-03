const router = require("express").Router();
const photoUpload = require("../middlewares/photoUpload");
const { validateObjectId } = require("../middlewares/validateObjectId");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
    getAllProductsCtrl,
    newProductCtrl,
    countProductsCtrl,
    getProductCtrl,
    deleteProductCtrl
} = require("../controllers/productController");

/*===========================================*/
/*===========================================*/
/*===========================================*/

// /api/products
router.route("/")
    .get(getAllProductsCtrl)
    .post(verifyTokenAndAdmin, photoUpload.single("image"), newProductCtrl);

/*=========================================*/

// get products count
// /api/products/count
router.route("/count").get(countProductsCtrl);

/*=========================================*/

// /api/products/:id
router.route("/:id")
    .get(validateObjectId, getProductCtrl)
    .delete(validateObjectId, verifyTokenAndAdmin, deleteProductCtrl);

module.exports = router; 