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
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
    },
    rating: {
        type: Number,
        default: 0
    },
    imageURL: {
        type: String,
        default: "https://shorturl.at/RnRet",
    },
    imageSignature: {
        type: String,
        required: false
    },
    stock: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Product", productSchema);