import mongoose from "mongoose";

const examResultSchema = new mongoose.Schema(

    {

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        // practice | module | final
        type: {

            type: String,

            enum: [

                "practice",

                "module",

                "final"

            ],

            default: "practice"

        },

        score: {

            type: Number,

            required: true

        },

        domainScores: {

            type: Object,

            default: {}

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model(
    "ExamResult",
    examResultSchema
);