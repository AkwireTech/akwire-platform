import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {

    try {

        let token = null;

        // =====================================
        // 1. AUTHORIZATION HEADER (POSTMAN/API)
        // =====================================

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {

            token = req.headers.authorization.split(" ")[1];

        }

        // =====================================
        // 2. HTTP-ONLY COOKIE (BROWSER)
        // =====================================

        if (!token && req.cookies?.akwire_session) {

            token = req.cookies.akwire_session;

        }

        // =====================================
        // NO TOKEN FOUND
        // =====================================

        if (!token) {

            return res.status(401).json({
                message: "Not authorized"
            });

        }

        // =====================================
        // VERIFY TOKEN
        // =====================================
console.log("=== AUTH DEBUG ===");
console.log("Cookies:", req.cookies);
console.log("Token exists:", !!token);
console.log("JWT Secret exists:", !!process.env.JWT_SECRET);
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
console.log("Decoded:", decoded);
        const user = await User.findById(decoded.id)
            .select("-password");
console.log("User:", user);
        if (!user) {

            return res.status(401).json({
                message: "User no longer exists"
            });

        }

        req.user = user;

        next();

    }

 catch (error) {
    console.error("AUTH ERROR:", error);
    return res.status(401).json({
        message: error.message
    });
}

};