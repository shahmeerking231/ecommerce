const express = require("express");
const path = require('path');
const multer = require("multer");
const { getProduct, createProduct, getProductById, deleteProductById, updateProductById } = require("../controllers/product");

let oneStepBack = path.join(__dirname, '../');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, oneStepBack + '/public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
        req.img = Date.now() + '-' + file.originalname;
    }
})

var upload = multer({ storage: storage })

const router = express.Router();

router.get("/", getProduct);
router.post("/", upload.any(), createProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.put("/:id", updateProductById);


module.exports = router;