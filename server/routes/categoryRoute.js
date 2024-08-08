const router = require("express").Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { validateObjectId } = require("../middlewares/validateObjectId");
const {
    allCategoriesCtrl,
    newCategoryCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl
} = require("../controllers/categoryController");

/*===========================================*/
/*===========================================*/
/*===========================================*/

// /api/categories 
router.route("/")
    .get(allCategoriesCtrl)
    .post(verifyTokenAndAdmin, newCategoryCtrl);

/*=========================================*/

// /api/categories/:id
router.route("/:id")
    .put(verifyTokenAndAdmin, updateCategoryCtrl)
    .delete(validateObjectId, verifyTokenAndAdmin, deleteCategoryCtrl);

/*=========================================*/

module.exports = router;