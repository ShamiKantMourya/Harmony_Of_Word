const express = require("express");
const { createPost, likeUnlikePost, deletePost, getFollowingPost } = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/createpost").post(isAuthenticated, createPost);
router.route("/:id").get(isAuthenticated, likeUnlikePost);
router.route("/:id").delete(isAuthenticated, deletePost);

router.route("/posts").get(isAuthenticated, getFollowingPost);

module.exports = router;