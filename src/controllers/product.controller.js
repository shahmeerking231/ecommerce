const cloudinary = require("cloudinary").v2;
const Product = require("../models/product.model");
const User = require("../models/user.model");
const { redisClient } = require("../services/cache.service");

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
    const { name, description, price, stock, category } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    const imageURL = result.url;
    try {
        let product = await Product.create({
            name,
            description,
            price,
            imageURL,
            stock,
            category,
            imageSignature: result.signature
        });
        if (product) {
            redisClient.del("all_products");
            return res.status(200).redirect("/admin/addProduct");
        } else {
            return res.status(401).json({ success: false, message: "Product Not Created" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, err: `Internal Server Error, Try Again! ${error}` });
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    let user = req.user;
    let cacheKey = `product_${id}`;
    if (user) {
        try {
            const dbUser = await User.findById(user._id);
            if (dbUser) user = dbUser;
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    }
    try {
        let product;
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            product = JSON.parse(cachedData);
        } else {
            product = await Product.findOne({
                _id: id
            });
            await redisClient.set(cacheKey, JSON.stringify(product), {
                EX: 3600
            });
        }

        if (product) {
            return res.status(200).render("./common/productView", { success: true, product, user: user });
        } else {
            return res.status(401).render("./common/productView", { success: false, message: "Product not Found!", user: user });
        }
    } catch (error) {
        return res.status(500).render("./common/productView", { success: false, message: "Internal Server Error!", user: user });
    }
}

const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        let product = await Product.findByIdAndDelete(id);
        if (product) {
            if (product.imageURL !== "https://shorturl.at/RnRet") {
                cloudinary.uploader.destroy(product.imageSignature);
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
    const { name, description, price, stock, category } = req.body;
    const { id } = req.params;

    try {
        let product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            stock,
            category
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

const searchProduct = async (req, res) => {
    const { key } = req.query;
    try {
        let products = await Product.find({
            $or: [
                { name: { $regex: key, $options: 'i' } },
                { category: { $regex: key, $options: 'i' } }
            ]
        });
        if (products) {
            return res.status(200).render("./common/searchResults", { success: true, products, user: req.user, searchQuery: key });
        }
        return res.status(401).render("./common/searchResults", { success: false, message: "No Products Found!", user: req.user, searchQuery: key });
    } catch (error) {
        return res.status(500).render("./common/searchResults", { success: false, message: "Internal Server error", user: req.user });
    }
}

const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        let products = await Product.find({ category: category });
        console.log(products)
        if (products) {
            return res.status(200).render("./common/categoryProducts", { success: true, products, user: req.user, category: category });
        }
        return res.status(401).json({ success: false, message: "No Products Found!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error" });
    }
}

const renderHome = async (req, res) => {
    const user = req.user;
    let cacheKey = "all_products";

    try {

        let products;
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            products = JSON.parse(cachedData);
        } else {
            products = await Product.find();
            await redisClient.set(cacheKey, JSON.stringify(products), {
                EX: 3600
            });
        }

        if (req.user.isAdmin) {
            if (!products) return res.render("./admin/home", { error: "Products not found", user: user });
            else return res.render("./admin/home", { products: products, user: user });
        }
        else {
            if (!products) return res.render("./user/home", { error: "Products not found", user: user });
            else return res.render("./user/home", { products: products, user: user });
        }

    } catch (err) {
        console.error("Error fetching user:", err);
    }

}

module.exports = ({
    getProduct,
    createProduct,
    getProductById,
    deleteProductById,
    updateProductById,
    searchProduct,
    getProductsByCategory,
    renderHome
})