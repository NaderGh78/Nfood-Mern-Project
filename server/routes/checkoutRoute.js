const router = require("express").Router();
const { initiateCheckout, confirmCheckout } = require("../controllers/checkoutController");
const { verifyToken } = require("../middlewares/verifyToken");

/*===========================================*/
/*===========================================*/
/*===========================================*/

// /api/checkout
router.route("/").post(verifyToken, initiateCheckout);

// /api/checkout/:orderId
router.route("/:orderId").put(verifyToken, confirmCheckout);

/*===========================================*/

module.exports = router;