const userSchema = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const Signup = async (req, res) => {
    const { username, email, password, location, isAdmin } = req.body;
    let hashPassword;
    try {
        hashPassword = await bcrypt.hash(password, 10);

    } catch (err) {
        return res.status(400).render("signup", { err: "Internal Server Error, Try Again!" });
    }
    await userSchema.create({
        username,
        email,
        password: hashPassword,
        location,
        isAdmin
    }).then((user) => {
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
    }).catch((error) => {
        console.log(error.message);
        return res.status(500).render("signup", { err: error });
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) { // Use a more concise check
        return res.render("login", { err: "All fields are required!" });
    }

    try {
        const user = await userSchema.findOne({ email }).select('+password');
        if (!user) {
            return res.render("login", { err: "Invalid Email or Password!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render("login", { err: "Invalid Email or Password!" });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username, isAdmin: user.isAdmin, location: user.location },
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
        return res.render("login", { err: "Internal Server Error, Try Again!" });
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    return res.redirect("/login");
}

const profile = (req, res) => {
    const user = req.user;
    if (!user) {
        return res.redirect("/login");
    }
    return res.render("profileDetails", { user });
}

const saveProfile = async (req, res) => {
    const { username, email, location } = req.body;
    const userId = req.user.id; 

    if (!username || !email || !location) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!"
        });
    }

    try {
        const user = await userSchema.findByIdAndUpdate(
            userId,
            { username, email, location },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



module.exports = {
    Signup,
    login,
    logout,
    profile,
    saveProfile
}