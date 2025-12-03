const fs = require("fs");
const path = require("path");
const Product = require("../models/product");

const getProduct = async (req, res) => {
    try {
        let products = await Product.find();
        if (products) {
            return res.status(200).json({ success: true, products });
        }
        return res.status(401).json({ success: false, message: "No Products Found!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error" });
    }
}

const createProduct = async (req, res) => {
    const { name, description, price, quantity } = req.body;
    const imageURL = req.img;
    try {
        let product = await Product.create({
            name,
            description,
            price,
            imageURL,
            quantity
        });
        if (product) {
            return res.status(200).json({ success: true, product });
        } else {
            return res.status(401).json({ success: false, message: "Product Not Created" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, err: `Internal Server Error, Try Again! ${error}` });
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    try {
        let product = await Product.findOne({
            _id: id
        });
        if (product) {
            return res.status(200).render("productView", { success: true, product });
        } else {
            return res.status(401).render("productView", { success: false, message: "Product not Found!" });
        }
    } catch (error) {
        console.error("ERROR in getProductById:", error);
        return res.status(500).render("productView", { success: false, message: "Internal Server Error!"});
    }
}

const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        let product = await Product.findByIdAndDelete(id);
        if (product) {
            if (!product.imageURL === "https://shorturl.at/RnRet") {
                let oneStepBack = path.join(__dirname, '../');return 
                await fs.unlinkSync(path.resolve(oneStepBack + 'public/images/' + product.imageURL));
            }
            else {
                return res.status(200).json({ success: true, message: "Product Deleted Successfully!" });
            }
        } else {
            return res.status(404).json({ success: false, message: "Product Not Found!" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateProductById = async (req, res) => {
    const { name, description, price, quantity } = req.body;
    const { id } = req.params;
    try {
        let product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            quantity
        })
        if (product) {
            return res.status(200).json({ success: true, product });
        } else {
            return res.status(404).json({ success: false, message: "Product Not Found!" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const renderHome = async (req, res) => {
    const user = req.user;
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