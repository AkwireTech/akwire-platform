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

            const bearerToken = req.headers.authorization.split(" ")[1];

            if (
                bearerToken &&
                bearerToken !== "null" &&
                bearerToken !== "undefined"
            ) {
                token = bearerToken;
            }

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

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id)
            .select("-password");

        if (!user) {

            return res.status(401).json({
                message: "User no longer exists"
            });

        }

        req.user = user;

        next();

    }

    catch (error) {

        console.error("Authentication Error:", error);

        return res.status(401).json({

            message: "Token verification failed"

        });

    }

};