import { createAnnouncement } from "../controllers/Announcement.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.route("/create").post(verifyToken, createAnnouncement);

export default router;