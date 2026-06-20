const User = require("../models/User");
const generateToken = require("../utils/generateToken");


// REGISTER NORMAL USER
exports.register = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;


        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }


        // Create normal user only
        const user = await User.create({
            name,
            email,
            password,
            address,
            role: "USER"
        });


        res.status(201).json({
            success: true,
            message: "Registration successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error("REGISTER ERROR:", error);
    
    res.status(500).json({
        success: false,
        message: error.message,
        stack: error.stack
        });
    }
};




// LOGIN FOR ALL USERS
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;


        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        // Compare password
        const isMatch = await user.comparePassword(password);


        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        // Generate JWT
        const token = generateToken(
            user._id,
            user.role
        );


        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch(error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};