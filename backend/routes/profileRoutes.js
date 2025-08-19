import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { saveProfile, getProfile } from "../controllers/profileController.js";

const router = express.Router();

router.post("/", authMiddleware, saveProfile);
router.get("/", authMiddleware, getProfile);

export default router;

