const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
    try {
        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: "req.body.public_id",
                url: "req.body.url"
            },
            owner: req.user._id,
        };
        const newPost = await Post.create(newPostData);

        const user = await User.findById(req.user._id);
        user.posts.push(newPost._id);

        await user.save();

        res.status(201).json({
            success: true,
            post: newPost,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(post);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        await post.remove();


        const user = await User.findById(req.user._id);

        const index = user.posts.indexOf(req.params.id);

        user.posts.splice(index, 1);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Post Deleted",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.likeUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        };

        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id)
            post.likes.splice(index, 1);
            await post.save();

            return res.status(200).json({
                success: true,
                message: "Post unliked ",
            })
        } else {
            post.likes.push(req.user._id);
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Post Liked",
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.getFollowingPost = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        const posts = await Post.find({
            owner: {
                $in: user.following,
            },
        });

        res.status(200).json({
            success: true,
            posts,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.updateCaption = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            })
        }

        post.caption = req.body.caption;

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post Updated",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.makeComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        let commentIndex = -1;

        post.comments.forEach((element, index) => {
            if (element.user.toString() === req.user._id.toString()) {
                commentIndex = index;
            }
        });

        if (commentIndex !== -1) {
            post.comments[commentIndex].comment = req.body.comment;

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Comment Updated",
            })
        } else {
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment,
            });
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Comment Added"
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.deleteComment = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        if (post.owner.toString() === req.user._id.toString()) {
            if(req.body.commentId === undefined){
                return res.status(400).json({
                    success: false,
                    message: "Cannot find post with this id",
                })
            }
            post.comments.forEach((element, index) => {
                if (element._id.toString() === req.body.commentId.toString()) {
                    return post.comments.splice(index, 1);
                }
            });

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Selected comment deleted",
            })
        } else {
            post.comments.forEach((element, index) => {
                if (element.user.toString() === req.user._id.toString()) {
                    return post.comments.splice(index, 1);
                }
            });

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Comment Deleted",
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

