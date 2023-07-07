const express = require("express");
const { registerUser, loginUser, followUser, logoutUser } = require("../controllers/user");
const {isAuthenticated} = require("../middlewares/auth");
const { updatePassword, updateProfile } = require("../controllers/userProfile");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);

module.exports = router;