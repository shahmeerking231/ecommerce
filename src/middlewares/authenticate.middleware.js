const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticateToken = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.redirect("/login");
        }

        req.user = user;
        next();
    } catch (err) {
        return res.redirect("/login");
    }
}

const authenticateAdmin = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(decoded._id);

        if (!user || !user.isAdmin) {
            return res.redirect("/login");
        }

        req.user = user;
        next();
    } catch (err) {
        return res.redirect("/login");
    }
}

module.exports = { authenticateToken, authenticateAdmin };