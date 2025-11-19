const Product = require("../models/product");

const getProduct = async (req, res) => {
    try {
        let products = await Product.find();
        if (products) {
            res.status(200).json({ success: true, products });
        }
        res.status(401).json({ success: false, message: "No Products Found!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
}

const createProduct = async (req, res) => {
    const { name, description, price, imageURL, quantity } = req.body;
    try {
        let product = await Product.create({
            name,
            description,
            price,
            imageURL,
            quantity
        });
        if (product) {
            res.status(200).json({ success: true, product });
        } else {
            res.status(401).json({ success: false, message: "Product Not Created" });
        }
    } catch (error) {
        res.status(500).json({ success: false, err: `Internal Server Error, Try Again! ${error}` });
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        let product = await Product.findOneById({
            id
        });
        if (product) {
            res.status(200).json({ success: true, product });
        } else {
            res.status(404).json({ success: false, message: "Product Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        let product = await Product.findByIdAndDelete(id);
        if (product) {
            res.status(200).json({ success: true, message: "Product Deleted Successfully!" });
        } else {
            res.status(404).json({ success: false, message: "Product Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateProductById = async (req, res) => {
    const { name, description, price, imageURL, quantity } = req.body;
    const { id } = req.params;
    try {
        let product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            imageURL,
            quantity
        })
        if (product) {
            res.status(200).json({ success: true, product });
        } else {
            res.status(404).json({ success: false, message: "Product Not Found!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const renderHome = async (req, res) => {
    const user = req.user;
    console.log(user);
    let products = await Product.find();
    if (req.user.isAdmin) {
        if (!products) return res.render("adminHome", { error: "Products not found", user: user });
        else return res.render("adminHome", { products: products, user: user });
    }
    else {
        if (!products) return res.render("home", { error: "Products not found", user: user });
        else return res.render("home", { products: products, user: user });
    }
}

module.exports = ({
    getProduct,
    createProduct,
    getProductById,
    deleteProductById,
    updateProductById,
    renderHome
})