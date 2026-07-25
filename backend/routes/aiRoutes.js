import express from "express";
import { askMentor } from "../controllers/aiController.js";

const router = express.Router();

router.post("/mentor", askMentor);

export default router;