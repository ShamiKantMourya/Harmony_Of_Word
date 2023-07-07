const User = require("../models/User");
const Post = require("../models/Post");
//Update Profile

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { name, email } = req.body;
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }

        //Avatar


        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

//Update Pasword

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide old and new password",
            })
        }

        const isMatch = await user.matchPassword(oldPassword);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect old password",
            });
        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};


exports.myProfile = async(req, res) => {

    try {
        
        const user = await User.findById(req.user._id).populate("posts");

        await user.save();

        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

//Delete Profile

exports.deleteProfile = async(req,res) => {

    try {
        
        const user = await User.findById(req.user._id);
        const posts = user.posts;
        const followers = user.followers;
        const userId = user._id;

        await user.remove();

        res.cookie("token", null ,{expires: new Date(Date.now()), httpOnly: true});

        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i]);
            await post.remove();
        };

        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById(followers[i]);

            const index = follower.following.indexOf(userId)

            follower.following.splice(index,1);
            await follower.save();
            
        }

        res.status(200).json({
            success: true,
            message: "Profile Deleted",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};