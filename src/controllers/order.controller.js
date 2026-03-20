const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getOrders = async (req, res) => {
    const user = req.user;
    try {
        let orders = await Order.find();
        if (orders) {
            return res.status(200).render("./admin/orders", { success: true, orders, user });
        }
        else return res.status(401).render("./admin/orders", { success: false, message: "No Orders Found" });
    } catch (err) {
        return res.status(500).render("./admin/orders", { success: false, error: "Internal Server Error!" });
    }
}

const userSpecificOrders = async (req, res) => {
    const user = req.user;
    try {
        let orders = await Order.find({
            userId: user._id
        });
        let products = await Product.find();
        if (orders) {
            return res.status(200).render("./user/orders", { orders, user, products })
        } else {
            return res.status(401).render("./user/orders", { message: "No orders Found!", user, products })
        }
    } catch (error) {
        return res.status(500).render("./user/orders", { success: false, error: "Internal Server Error!" });
    }
}

const createOrder = async (req, res) => {
    const { products, totalAmount, paymentMethod } = req.body;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 7) + 3);
    const formattedDate = deliveryDate.toLocaleDateString('en-GB');

    let orderId = parseInt(Math.random() * 1000000);
    try {
        let sessionUrl = null;
        const productsToSave = [];
        for (const item of products) {
            let product = await Product.findById(item.product._id);
            if (product.stock < item.quantity) {
                if (product.stock === 0) {
                    return res.status(409).json({ success: false, message: "Product Sold out", product: product.name });
                } else {
                    return res.status(409).json({ success: false, message: `Only ${product.stock} items left in stock`, product: product.name });
                }
            }
            productsToSave.push({
                product: item.product._id,
                quantity: item.quantity
            });
        }

        if (paymentMethod === "Online") {
            const session = await stripe.checkout.sessions.create({
                line_items: products.map((product) => {
                    return {
                        price_data: {
                            currency: 'pkr',
                            product_data: {
                                name: product.product.name,
                                images: [product.product.imageURL]
                            },
                            unit_amount: Math.round(product.product.price * 100),
                        },
                        quantity: product.quantity
                    }
                }),
                mode: "payment",
                success_url: `${process.env.SITE_URL || `http://localhost:${process.env.PORT || 3000}`}/complete?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
                cancel_url: `${process.env.SITE_URL || `http://localhost:${process.env.PORT || 3000}`}/cancel/${orderId}`,
            });
            sessionUrl = session.url;
        }

        const order = await Order.create({
            products: productsToSave,
            userId: req.user._id,
            orderId,
            deliveryDate: formattedDate,
            totalAmount,
            payment: "Pending",
            paymentMethod: paymentMethod,
            isDelivered: false
        });

        if (order) {
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    purchaseHistory: products.map((eachProduct) => ({
                        product: eachProduct.product._id,
                        rated: false
                    }))
                }
            }).exec();

            await Promise.all(products.map(async (item) => {
                await Product.findByIdAndUpdate(item.product._id, {
                    $inc: { stock: -item.quantity }
                });
            }));

            if (sessionUrl) {
                return res.status(200).json({ success: true, url: sessionUrl, orderId: orderId });
            }
            return res.status(200).json({ success: true });
        }
        return res.status(401).json({ success: false, message: "Order Not Created" });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Internal Server Error, Try Again! ${error}` });
    }
}

const changeDelivered = async (req, res) => {
    const { id } = req.body;
    console.log("ORDER ID RECEIVED:", id);

    const deliveryDate = new Date();
    const formattedDate = deliveryDate.toLocaleDateString('en-GB');

    try {
        const order = await Order.findByIdAndUpdate(
            id,
            {
                isDelivered: true,
                deliveryDate: formattedDate
            },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ success: false, message: "Order Not Found" });
        }
        return res.status(200).json({ success: true, message: "Order Delivered!" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
}

const paymentCompleted = async (req, res) => {
    const { session_id, orderId } = req.query;

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (!session) {
            return res.status(404).render("./user/paymentCompleted", { success: false, error: "Session Not Found!", order: null });
        }

        if (session.payment_status !== "paid") {
            return res.status(400).render("./user/paymentCompleted", { success: false, error: "Payment Not Completed!", order: null });
        }

        const order = await Order.findOneAndUpdate(
            { orderId: orderId },
            { payment: "Paid" },
            { new: true }
        );
        if (!order) {
            return res.status(404).render("./user/paymentCompleted", { success: false, error: "Order Not Found", order: null });
        }
        return res.status(200).render("./user/paymentCompleted", { order });
    }
    catch (error) {
        return res.status(500).render("./user/paymentCompleted", { success: false, error: "Internal Server Error!", order: null });
    }
}

const paymentFailed = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findOneAndUpdate(
            { orderId: orderId },
            { payment: "Failed" },
            { new: true }
        );
        if (!order) {
            return res.status(404).render("./user/paymentFailed", { success: false, error: "Order Not Found", order: null });
        }
        return res.status(200).render("./user/paymentFailed", { order });
    }
    catch (error) {
        return res.status(500).render("./user/paymentFailed", { success: false, error: "Internal Server Error!", order: null });
    }
}

module.exports = {
    getOrders,
    userSpecificOrders,
    createOrder,
    changeDelivered,
    paymentCompleted,
    paymentFailed
}