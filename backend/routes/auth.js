const express = require("express");
const router = express.Router();
const { userSignUp, userSignIn, userLogOut } = require("../controllers/authControllers");

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.post("/logout", userLogOut);

module.exports = router;
