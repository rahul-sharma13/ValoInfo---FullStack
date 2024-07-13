import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { createPost, deletePost } from '../controllers/Post.controller.js';

const router = Router();

router.route("/create").post(verifyToken, createPost);
router.route("/delete/:id").delete(verifyToken, deletePost);

export default router;