import express from "express";
import { createComment } from "../controllers/Comment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/post").post(verifyToken, createComment);

export default router;
