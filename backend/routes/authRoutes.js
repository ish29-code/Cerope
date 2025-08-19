import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { signup, login, getProfile } from "../controllers/authControllers.js";

const router = express.Router();

// ✅ Routes only point to controller functions
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

export default router;

