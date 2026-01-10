const express = require("express");
const userController = require("../controllers/user.controller");
const { authenticateToken } = require("../middlewares/authenticate.middleware");

const router = express.Router();

router.get("/profile", authenticateToken, userController.profile);
router.post("/saveProfile", authenticateToken, userController.saveProfile);
router.post("/rating", authenticateToken, userController.ratingProductById);
router.post("/addToWishlist", authenticateToken, userController.addToWishlist);
router.get("/wishlist", authenticateToken, userController.getWishlist);
router.post("/removeFromWishlist/:productId", authenticateToken, userController.removeFromWishlist);

module.exports = router;