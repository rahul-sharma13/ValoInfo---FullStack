import express from "express";
import { createComment, getPostComments } from "../controllers/Comment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/post").post(verifyToken, createComment);
router.route("/getPostComments/:postId").get(getPostComments);

export default router;