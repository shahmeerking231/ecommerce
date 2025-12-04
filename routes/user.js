const express = require("express");
const { Signup, login, logout, profile, saveProfile } = require("../controllers/user");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.post("/sign-up", Signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile",authenticateToken, profile);
router.post("/saveProfile",authenticateToken, saveProfile)

module.exports = router;