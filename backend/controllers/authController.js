const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log("BODY:", req.body); // 👈 debug

        if (!username || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide a username and password.',
            });
        }

        const user = await User.findOne({ username }).select('+password');

        console.log("USER:", user); // 👈 debug

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'User not found',
            });
        }

        if (!(await user.comparePassword(password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect password',
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            status: 'success',
            token,
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error); // 👈 VERY IMPORTANT

        res.status(500).json({
            status: 'error',
            message: error.message, // 👈 show real error
        });
    }
};