const express = require("express");
const { Signup, login } = require("../controllers/user");

const router = express.Router();

router.post("/sign-up", Signup);
router.post("/login", login);
router.post("/user-details", (req,res)=> res.send("Profile-details!"));

module.exports = router;