const express = require("express");
const path = require('path');
const multer = require("multer");
const productController = require("../controllers/product.controller");
const { authenticateToken, authenticateAdmin } = require("../middlewares/authenticate.middleware");

const upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }
})

const router = express.Router();

router.get("/", productController.getProduct);
router.post("/", upload.single("image"), productController.createProduct);
router.get("/category/:category", authenticateToken, productController.getProductsByCategory);
router.get("/:id", authenticateToken, productController.getProductById);
router.delete("/:id", authenticateAdmin, productController.deleteProductById);
router.put("/:id", authenticateAdmin, productController.updateProductById);
router.get("/api/search", authenticateToken, productController.searchProduct);


module.exports = router;