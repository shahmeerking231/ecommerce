const express = require("express");
const orderController = require("../controllers/order.controller");
const { authenticateToken, authenticateAdmin } = require("../middlewares/authenticate.middleware");

const router = express.Router();

router.get("/orders", authenticateAdmin, orderController.getOrders);
router.get("/user/orders", authenticateToken, orderController.userSpecificOrders);
router.post("/orders", authenticateToken, orderController.createOrder);
router.post("/orders/delivered", authenticateAdmin, orderController.changeDelivered);
router.get("/complete/:orderId", authenticateToken, orderController.paymentCompleted);
router.get("/cancel/:orderId", authenticateToken, orderController.paymentFailed);

module.exports = router;
