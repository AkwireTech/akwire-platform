import mongoose from "mongoose";
import Conversation from "../../models/Conversation.js";
import aiPolicy from "../../config/aiPolicy.js";

function trimMessages(messages) {
    const max = aiPolicy.maxConversationMessages;

    if (messages.length <= max) {
        return messages;
    }

    return messages.slice(messages.length - max);
}

function createTitle(message) {
    if (!aiPolicy.generateConversationTitle) {
        return "New Conversation";
    }

    const clean = message
        .replace(/\s+/g, " ")
        .trim();

    return clean.substring(
        0,
        aiPolicy.maxConversationTitleLength
    );
}

export async function createConversation({
    userId,
    firstMessage = ""
}) {
    const conversation = await Conversation.create({
        user: userId,

        title: createTitle(firstMessage),

        messages: []
    });

    return conversation;
}

export async function getConversation(
    conversationId,
    userId
) {
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        return null;
    }

    return await Conversation.findOne({
        _id: conversationId,
        user: userId,
        archived: false
    });
}

export async function getRecentConversations(userId) {
    return await Conversation.find({
        user: userId,
        archived: false
    })
        .sort({
            updatedAt: -1
        })
        .limit(20)
        .select("title updatedAt");
}

export async function addMessage(
    conversation,
    role,
    content
) {
    conversation.messages.push({
        role,
        content
    });

    conversation.messages = trimMessages(
        conversation.messages
    );

    await conversation.save();

    return conversation;
}

export async function renameConversation(
    conversation
) {
    if (
        conversation.title &&
        conversation.title !== "New Conversation"
    ) {
        return conversation;
    }

    const firstUserMessage = conversation.messages.find(
        m => m.role === "user"
    );

    if (!firstUserMessage) {
        return conversation;
    }

    conversation.title = createTitle(
        firstUserMessage.content
    );

    await conversation.save();

    return conversation;
}

export async function archiveConversation(
    conversationId,
    userId
) {
    return await Conversation.findOneAndUpdate(
        {
            _id: conversationId,
            user: userId
        },
        {
            archived: true
        },
        {
            new: true
        }
    );
}