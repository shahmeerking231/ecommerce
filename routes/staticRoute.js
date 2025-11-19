const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const {renderHome} = require("../controllers/product")

const router = express.Router();

router.get("/", authenticateToken, renderHome);
router.get("/login", (req, res) => res.render("login"));
router.get("/sign-up", (req, res) => res.render("signup"));
router.get("/cart", authenticateToken, (req, res) => res.render("cart", {user: req.user}));
router.get("/edit", (req,res) => res.render("editProduct"));

module.exports = router;