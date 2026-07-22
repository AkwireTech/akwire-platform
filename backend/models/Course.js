
import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    overview: {
        type: String,
        default: ""
    },

    objectives: [{
        type: String
    }],

    content: {
        type: String,
        default: ""
    },

    summary: {
        type: String,
        default: ""
    },

    keyTerms: [{
        term: String,
        definition: String
    }],

    knowledgeCheck: [{
        question: String,
        options: [String],
        answer: Number,
        explanation: String
    }],

    lab: {
        title: {
            type: String,
            default: ""
        },
        instructions: {
            type: String,
            default: ""
        },
        solution: {
            type: String,
            default: ""
        }
    },

    flashcards: [{
        front: String,
        back: String
    }],

    aiTutor: {
        type: String,
        default: ""
    },

    studyGuide: {
        type: String,
        default: ""
    },

    estimatedTime: {
        type: Number,
        default: 15
    },

    videoUrl: {
        type: String,
        default: ""
    },

    resources: [{
        title: String,
        url: String
    }]

});

const moduleSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    lessons: [lessonSchema]

});

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    domain: {
        type: String,
        required: true
    },

    thumbnail: {
        type: String,
        default: ""
    },

    published: {
        type: Boolean,
        default: false
    },

    modules: [moduleSchema]

}, {

    timestamps: true

});

export default mongoose.model(
    "Course",
    courseSchema
);
