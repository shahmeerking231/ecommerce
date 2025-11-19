const express = require("express");
const { getOrders, userSpecificOrders, createOrder, changeDelivered } = require("../controllers/order");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.get("/", getOrders);
router.get("/user", authenticateToken, userSpecificOrders);
router.post("/", authenticateToken, createOrder);
router.post("/delivered", changeDelivered);

module.exports = router;
