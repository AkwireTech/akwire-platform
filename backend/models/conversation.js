import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["system", "user", "assistant"],
            required: true
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        _id: false
    }
);

const conversationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        title: {
            type: String,
            default: "New Conversation",
            trim: true,
            maxlength: 100
        },

        mode: {
            type: String,
            enum: [
                "lesson",
                "lab",
                "exam",
                "career",
                "interview",
                "course-builder",
                "admin"
            ],
            default: "lesson"
        },

        course: {
            type: String,
            default: ""
        },

        module: {
            type: String,
            default: ""
        },

        lesson: {
            type: String,
            default: ""
        },

        messages: {
            type: [messageSchema],
            default: []
        },

        archived: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

conversationSchema.index({
    user: 1,
    updatedAt: -1
});

export default mongoose.model(
    "Conversation",
    conversationSchema
);