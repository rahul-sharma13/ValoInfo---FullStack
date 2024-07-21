import express from "express";
import { createComment, editComment, getPostComments, likeComment } from "../controllers/Comment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/post").post(verifyToken, createComment);
router.route("/getPostComments/:postId").get(getPostComments);
router.route("/likeComment/:commentId").put(verifyToken, likeComment);
router.route("/editComment/:commentId").put(verifyToken, editComment);

export default router;