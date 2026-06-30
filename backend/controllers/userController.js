import User from "../models/User.js";

// ==========================
// GET LOGGED-IN USER
// ==========================

export const getUserProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id)
            .select("-password");

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// ==========================
// GET ALL USERS (ADMIN)
// ==========================

export const getUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.json(users);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to load users"
        });

    }

};


// ==========================
// UPDATE USER ROLE
// ==========================

export const updateUserRole = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.role = req.body.role;

        await user.save();

        res.json(user);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Role update failed"
        });

    }

};


// ==========================
// DELETE USER
// ==========================

export const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        await user.deleteOne();

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Delete failed"
        });

    }

};