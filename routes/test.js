const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.post("/",authenticateToken ,(req,res) => {
    res.send(req.user._id);
});

module.exports = router;