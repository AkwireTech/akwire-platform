
import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        default: ""
    },

    videoUrl: {
        type: String,
        default: ""
    },

    resources: [{
        type: String
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
