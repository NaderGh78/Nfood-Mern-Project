const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
    getUserCartCtrl,
    creatCartCtrl,
    emptyUserCardCtrl,
    deleteCartCtrl
} = require("../controllers/cartController");

/*===========================================*/
/*===========================================*/
/*===========================================*/

// /api/carts
router.route("/")
    .get(verifyToken, getUserCartCtrl)
    .post(verifyToken, creatCartCtrl)
    .delete(verifyToken, emptyUserCardCtrl);

/*=========================================*/

// /api/carts/:id 
router.route("/:productId")
    .delete(verifyToken, deleteCartCtrl);

module.exports = router; 