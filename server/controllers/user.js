const User = require("../models/User");

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, location } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json(
            {
                success: false,
                message: "User already exists",
            });
        user = await User.create({
            name, email, password, location,
            avatar: {
                public_id: "sample_id",
                url: "sample_url"
            }
        });

        // res.status(201).json({ success: true, user });
        const token = await user.generateToken();

        const option = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.status(201).cookie("token", token, option).
            json({
                success: true,
                user,
                token,
            });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

//Login

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }
        const token = await user.generateToken();

        const option = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.status(200).cookie("token", token, option).
            json({
                success: true,
                user,
                token,
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}