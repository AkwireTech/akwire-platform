import { mentor } from "../services/ai/mentorEngine.js";

export const askMentor = async (req, res) => {

    try {

        const answer = await mentor(req.body);

        res.json({

            success: true,

            answer

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};