import express from "express";

import {
    getUserProfile,
    getUsers,
    updateUserRole,
    deleteUser
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// USER PROFILE
// ==========================

router.get(
    "/profile",
    protect,
    getUserProfile
);

// ==========================
// ADMIN USERS
// ==========================

router.get(
    "/",
    protect,
    getUsers
);

router.put(
    "/:id/role",
    protect,
    updateUserRole
);

router.delete(
    "/:id",
    protect,
    deleteUser
);

export default router;