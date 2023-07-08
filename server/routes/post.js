const express = require("express");
const {
    createPost,
    likeUnlikePost,
    deletePost,
    getFollowingPost,
    updateCaption,
    makeComments,
    deleteComment
} = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

//Create, Update, Delete and Likeunlike Post

router.route("/createpost").post(isAuthenticated, createPost);
router.route("/:id").get(isAuthenticated, likeUnlikePost);
router.route("/:id").put(isAuthenticated, updateCaption);
router.route("/:id").delete(isAuthenticated, deletePost);

router.route("/followingPosts").get(isAuthenticated, getFollowingPost); //not working properly

//Update, Add, Delete comment

router.route("/comment/:id").put(isAuthenticated, makeComments);
router.route("/comment/:id").delete(isAuthenticated, deleteComment);

module.exports = router;