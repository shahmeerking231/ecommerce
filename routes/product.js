const express = require("express");
const { getProduct, createProduct, getProductById, deleteProductById, updateProductById } = require("../controllers/product")

const router = express.Router();

router.get("/", getProduct);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.put("/:id", updateProductById);

module.exports = router;