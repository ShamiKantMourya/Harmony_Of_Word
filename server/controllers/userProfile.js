const crypto = require("crypto");

const User = require("../models/User");
const Post = require("../models/Post");
const { sendMail } = require("../middlewares/sendMail");


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
        const following = user.following;
        const userId = user._id;

        await user.remove();

        res.cookie("token", null ,{expires: new Date(Date.now()), httpOnly: true});

        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i]);
            await post.remove();
        };

            // Removing User from followers following

        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById(followers[i]);

            const index = follower.following.indexOf(userId)

            follower.following.splice(index,1);
            await follower.save();
            
        }

        //Removing Users from following's follower

        for (let i = 0; i < following.length; i++) {
            const userFollow = await User.findById(following[i]);

            const index = userFollow.followers.indexOf(userId)

            userFollow.followers.splice(index,1);
            await userFollow.save();
            
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

exports.getUserProfile = async(req,res) => {

    try {
        const user = await User.findById(req.params.id).populate("posts");

        if(!user){
            res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

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

exports.getAllUserData = async(req, res) => {

    try {
        const users = await User.find({});
         
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.forgetPassword = async(req,res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user){
            res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const resetPasswordToken = user.getResetPasswordToken();

        await user.save();

        const resetURL = `${req.protocol}://${req.get("host")}/user/password/reset/${resetPasswordToken}`;

        const resetPasswordUrlMessage = `Reset your password by clicking on the below link : \n\n ${resetURL}`;

        try {
            await sendMail({
                email: user.email,
                subject: "Reset Password",
                resetPasswordUrlMessage,
            });

            res.status(200).json({
                success: true,
                message: "Reset Password mail send to your emailId",
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordTokenExpire = undefined;

            await user.save();
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.resetPassword = async(req, res) => {
    try {
        const resetToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetToken,
            resetPasswordTokenExpire: {$gt: Date.now()},
        });

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid Token or has expired",
            })
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;

        await user.save();

         res.status(200).json({
            success: true,
            message: "Password Updated successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

