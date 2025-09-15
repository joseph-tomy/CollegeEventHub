import express from "express";
import { getEvents, createEvent } from "../controllers/event.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", getEvents);
router.post("/", authMiddleware, createEvent);

export default router;
