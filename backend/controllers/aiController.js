import { mentor } from "../services/ai/mentorEngine.js";

import {
    createConversation,
    getConversation,
    getRecentConversations,
    addMessage,
    renameConversation,
    archiveConversation
} from "../services/ai/conversationManager.js";

export const askMentor = async (req, res) => {
    try {
        const userId = req.user._id;

        let {
            conversationId,
            message
        } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required."
            });
        }

        let conversation = null;

        if (conversationId) {
            conversation = await getConversation(
                conversationId,
                userId
            );
        }

        if (!conversation) {
            conversation = await createConversation({
                userId,
                firstMessage: message
            });
        }

        await addMessage(
            conversation,
            "user",
            message
        );

        const history = conversation.messages.map(
            ({ role, content }) => ({
                role,
                content
            })
        );

        const { answer } = await mentor({
            ...req.body,
            message,
            conversation: {
                id: conversation._id,
                history
            },
            user: req.user
        });

        await addMessage(
            conversation,
            "assistant",
            answer
        );

        await renameConversation(conversation);

        return res.json({
            success: true,
            conversationId: conversation._id,
            title: conversation.title,
            answer
        });

    } catch (err) {

        console.error("AI Mentor Error:", err);

        return res.status(500).json({
            success: false,
            message: "Unable to process AI request."
        });

    }
};

export const getConversations = async (req, res) => {

    try {

        const conversations =
            await getRecentConversations(req.user._id);

        res.json({
            success: true,
            conversations
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

export const getConversationById = async (req, res) => {

    try {

        const conversation =
            await getConversation(
                req.params.id,
                req.user._id
            );

        if (!conversation) {

            return res.status(404).json({
                success: false,
                message: "Conversation not found."
            });

        }

        res.json({
            success: true,
            conversation
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

export const archiveConversationById = async (req, res) => {

    try {

        const conversation =
            await archiveConversation(
                req.params.id,
                req.user._id
            );

        if (!conversation) {

            return res.status(404).json({
                success: false,
                message: "Conversation not found."
            });

        }

        res.json({
            success: true,
            message: "Conversation archived successfully."
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};