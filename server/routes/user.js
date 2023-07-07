const express = require("express");
const { registerUser, loginUser, followUser, logoutUser } = require("../controllers/user");
const {isAuthenticated} = require("../middlewares/auth");
const { updatePassword, updateProfile, deleteProfile, myProfile } = require("../controllers/userProfile");

const router = express.Router();

//User Routes
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/follow/:id").get(isAuthenticated, followUser);

//User Profile Routes
router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/myProfile").get(isAuthenticated, myProfile);

router.route("/delete/profile").delete(isAuthenticated, deleteProfile);

module.exports = router;