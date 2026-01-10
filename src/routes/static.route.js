const express = require('express');
const { authenticateToken, authenticateAdmin } = require('../middlewares/authenticate.middleware');
const { renderHome } = require("../controllers/product.controller")

const router = express.Router();

router.get("/", authenticateToken, renderHome);
router.get("/login", (req, res) => res.render("./auth/login"));
router.get("/sign-up", (req, res) => res.render("./auth/signup"));
router.get("/cart", authenticateToken, (req, res) => res.render("./user/cart", { user: req.user }));
router.get("/edit", authenticateAdmin, (req, res) => res.render("./admin/editProduct"));
router.get("/addProduct", authenticateAdmin, (req, res) => res.render("./admin/addProduct"));

module.exports = router;