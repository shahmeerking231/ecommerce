const mongoose = require("mongoose");
const product = require("./product.model");

const orderSchema = mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    userId: {
        type: String,
        required: true,
    },
    orderId: {
        type: Number,
        required: true
    },
    deliveryDate: {
        type: String,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    payment: {
        type: String,
        required: true,
        enum: ["Paid", "Pending", "Failed"]
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["Online", "Cash on Delivery"]
    },
    totalAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);