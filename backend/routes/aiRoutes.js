import express from "express";

import {
    askMentor,
    getConversations,
    getConversationById,
    archiveConversationById
} from "../controllers/aiController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| AI Mentor
|--------------------------------------------------------------------------
*/

router.post(
    "/mentor",
    protect,
    askMentor
);

/*
|--------------------------------------------------------------------------
| Conversation History
|--------------------------------------------------------------------------
*/

router.get(
    "/conversations",
    protect,
    getConversations
);

router.get(
    "/conversations/:id",
    protect,
    getConversationById
);

router.delete(
    "/conversations/:id",
    protect,
    archiveConversationById
);

export default router;