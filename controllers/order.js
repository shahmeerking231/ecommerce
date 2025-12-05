const order = require("../models/order");
const Order = require("../models/order");

const getOrders = async (req, res) => {
    const user = req.user;
    try {
        let orders = await Order.find();
        if (orders) {
            return res.status(200).render("adminOrders", { success: true, orders, user });
        }
        else return res.status(401).render("adminOrders", { success: false, error: "No Orders Found" });
    } catch (err) {
        return res.status(500).render("adminOrders", { success: false, error: "Internal Server Error!" });
    }
}

const userSpecificOrders = async (req, res) => {
    const user = req.user;
    try {
        let orders = await Order.find({
            userId: user.id
        });
        if (orders) {
            return res.status(200).render("userOrders", {orders, user})
        } else {
            return res.status(401).render("userOrders", {message: "No orders Found!", user})
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
}

const createOrder = async (req, res) => {
    const { products, totalAmount } = req.body;
    let deliveryDate = 3;
    let orderId = parseInt(Math.random() * 1000000);
    try {
        const order = await Order.create({
            products,
            userId: req.user.id,
            orderId,
            deliveryDate,
            totalAmount
        });
        if (order) {
            return res.status(200).json({ success: true });
        }
        return res.status(401).json({ success: false, message: "Order Not Created" });
    } catch (error) {
        return res.status(500).json({ success: false, err: `Internal Server Error, Try Again! ${error}` });
    }
}

const changeDelivered = async (req, res) => {
    const { id } = req.body;
    console.log("ORDER ID RECEIVED:", id);

    try {
        const order = await Order.findByIdAndUpdate(
            id,
            { isDelivered: true },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ success: false, message: "Order Not Found" });
        }
        return res.status(200).json({ success: true, message: "Order Delivered!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
}

module.exports = {
    getOrders,
    userSpecificOrders,
    createOrder,
    changeDelivered
}