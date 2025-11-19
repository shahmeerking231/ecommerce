const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        minLength: [3, 'Product name must be at least 3 letters long'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        minLength: [3, 'Product description must be at least 3 letters long'],
        maxLength: [50, 'Product description limit reach']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    imageURL: {
        type: String,
        default: "https://shorturl.at/RnRet",
    },
    quantity: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Product", productSchema);