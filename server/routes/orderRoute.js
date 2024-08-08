const router = require("express").Router();
const { getAllOrders, getUserOrders, updateOrderStatus } = require("../controllers/orderController");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

/*===========================================*/
/*===========================================*/
/*===========================================*/

//  /api/orders
router.get("/", getAllOrders);

//  /api/orders/user-order
router.get("/user-order", verifyToken, getUserOrders);

//  /api/orders/:orderId
router.put("/:orderId", verifyTokenAndAdmin, updateOrderStatus);

/*===========================================*/

module.exports = router;