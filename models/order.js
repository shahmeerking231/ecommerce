const mongoose = require("mongoose");
const product = require("./product");

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
    deliveryDate: {
        type: Number,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    totalAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);