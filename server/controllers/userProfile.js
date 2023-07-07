const User = require("../models/User");

//Update Profile

exports.updateProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const {name, email} = req.body;
        if(name){
            user.name = name;
        }
        if(email){
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

exports.updatePassword = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");

        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success: false,
                message: "Please provide old and new password",
            })
        }

        const isMatch = await user.matchPassword(oldPassword);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message:  "Incorrect old password",
            });
        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({
            success:true,
            message: "Password updated",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};