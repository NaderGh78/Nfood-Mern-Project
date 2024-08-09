const router = require("express").Router();
const { confirmCheckout } = require("../controllers/checkoutController");
const { verifyToken } = require("../middlewares/verifyToken");

/*===========================================*/
/*===========================================*/
/*===========================================*/

// // /api/checkout
// router.route("/").post(verifyToken, initiateCheckout);

// // /api/checkout/:orderId
// router.route("/:orderId").put(verifyToken, confirmCheckout);

// /api/checkout
router.route("/").post(verifyToken, confirmCheckout);

/*===========================================*/

module.exports = router;