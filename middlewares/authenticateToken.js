const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.cookies ? req.cookies.token : undefined;
    if (token === null && token === undefined) {
        return res.redirect("/login");
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.redirect("/login");
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;