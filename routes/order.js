const router = require("express").Router();
const {
  verifyToken,
  verifyAdminToken,
} = require("../controllers/authController.js");
const orderController = require("../controllers/orderController.js");

router.get("/", verifyAdminToken, orderController.getAllOrders);

router.post("/", verifyToken, orderController.placeOrder);
router.patch("/:orderId", verifyToken,verifyAdminToken, orderController.updatePaidAmount);
router.post('/my-orders', verifyToken, orderController.getMyOrders);
module.exports = router;
