const express = require("express");
const { registerUser, loginUser, followUser } = require("../controllers/user");
const {isAuthenticated} = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/follow/:id").get(isAuthenticated, followUser);

module.exports = router;