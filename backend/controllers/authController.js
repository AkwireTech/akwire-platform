import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ==========================================
// REGISTER USER
// ==========================================

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, and a number"
      });
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return res.status(400).json({
        message: "Username already taken"
      });
    }

    const emailExists = await User.findOne({ email });

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

    res.status(201).json({
      user: {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role
      },
      token: generateToken(user._id)
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// ==========================================
// LOGIN USER
// ==========================================

export const loginUser = async (req, res, next) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const passwordMatch = await user.matchPassword(password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    return res.json({
      user: {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role
      },
      token: generateToken(user._id)
    });

  } catch (error) {

    next(error);

  }

};