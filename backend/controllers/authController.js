import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ==========================================
// GENERATE JWT
// ==========================================

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

// ==========================================
// SET AUTH COOKIE
// ==========================================

const setAuthCookie = (res, token) => {
    res.cookie("akwire_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};

// ==========================================
// REGISTER USER
// ==========================================

export const registerUser = async (req, res) => {

    const {
        username,
        email,
        password
    } = req.body;

    try {

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(password)) {

            return res.status(400).json({
                message:
                    "Password must be at least 8 characters and include uppercase, lowercase, and a number"
            });

        }

        const usernameExists =
            await User.findOne({ username });

        if (usernameExists) {

            return res.status(400).json({
                message: "Username already taken"
            });

        }

        const emailExists =
            await User.findOne({ email });

        if (emailExists) {

            return res.status(400).json({
                message: "Email already registered"
            });

        }

        const user = await User.create({
            username,
            email,
            password
        });

        const token =
            generateToken(user._id);

        setAuthCookie(res, token);

        return res.status(201).json({

            success: true,

            user: {
                _id: user._id.toString(),
                username: user.username,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: error.message
        });

    }

};

// ==========================================
// LOGIN USER
// ==========================================

export const loginUser = async (req, res, next) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                message:
                    "Email and password required"
            });

        }

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(401).json({
                message:
                    "Invalid credentials"
            });

        }

        const passwordMatch =
            await user.matchPassword(password);

        if (!passwordMatch) {

            return res.status(401).json({
                message:
                    "Invalid credentials"
            });

        }

        const token =
            generateToken(user._id);

        setAuthCookie(res, token);

        return res.json({

            success: true,

            user: {

                _id: user._id.toString(),
                username: user.username,
                email: user.email,
                role: user.role

            }

        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// LOGOUT USER
// ==========================================

export const logoutUser = (req, res) => {

    res.clearCookie("akwire_session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });

    res.json({
        success: true,
        message: "Logged out successfully"
    });

};