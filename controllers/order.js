const Order = require("../models/order");

const getOrders = async (req, res) => {
    try {
        let orders = await Order.find();
        if (orders) {
            res.status(200).json({ success: true, orders });
        }
        res.status(401).json({ success: false, message: "Orders not found" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const userSpecificOrders = async (req, res) => {
    const userId = req.user._id;
    try {
        let orders = await Order.find({
            userId
        });
        if (orders) {
            res.status(200).json({ success: true, orders });
        } else {
            res.status(401).json({ success: false, message: "Products not found!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
}

const createOrder = async (req, res) => {
    const { products, totalAmount } = req.body;
    let deliveryDate = 3;
    console.log(products, totalAmount, req.user);
    try {
        const order = await Order.create({
            products,
            userId: req.user.id,
            deliveryDate,
            totalAmount
        });
        if (order) {
            res.status(200).json({ success: true });
        }
        res.status(401).json({ success: false, message: "Order Not Created" });
    } catch (error) {
        res.status(500).json({ success: false, err: `Internal Server Error, Try Again! ${error}` });
    }
}

const changeDelivered = async (req, res) => {
    const { id } = req.body;
    try {
        const order = Order.findByIdAndUpdate(id, {
            isDelivered: true
        });
        if (order) {
            res.status(200).json({ success: true, order });
        } else {
            res.status(401).json({ success: false, message: "Order Not Found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}

module.exports = {
    getOrders,
    userSpecificOrders,
    createOrder,
    changeDelivered
}