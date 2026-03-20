const userSchema = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
    const { username, email, password, location } = req.body;
    const isAdmin = false;

    let hashPassword;
    try {
        hashPassword = await bcrypt.hash(password, 10);

        if (!username || !email || !password || !location) {
            return res.status(400).render("./auth/signup", { error: "All fields are required!" });
        }

        if (await userSchema.findOne({ email })) {
            return res.status(400).render("./auth/signup", { error: "User with this email already exists!" });
        }

        const user = await userSchema.create({
            username,
            email,
            password: hashPassword,
            location,
            isAdmin
        });

        const userPayload = user.toObject();
        delete userPayload.password;
        const token = jwt.sign(
            userPayload,
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000
        });
        return res.redirect("/");
    } catch (err) {
        return res.status(500).render("./auth/signup", { error: "Internal Server Error, Try Again!" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("./auth/login", { error: "All fields are required!" });
    }

    try {
        const user = await userSchema.findOne({ email }).select('+password');
        if (!user) {
            return res.render("./auth/login", { error: "Invalid Email or Password!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render("./auth/login", { error: "Invalid Email or Password!" });
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000,
        });

        return res.redirect("/");

    } catch (error) {
        console.error(error);
        return res.render("./auth/login", { error: "Internal Server Error, Try Again!" });
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    return res.redirect("/login");
}

module.exports = {
    register,
    login,
    logout
};