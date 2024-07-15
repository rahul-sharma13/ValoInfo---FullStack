import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { createPost, deletePost, getPosts, updatePost } from '../controllers/Post.controller.js';

const router = Router();

router.route("/create").post(verifyToken, createPost);
router.route("/delete/:id").delete(verifyToken, deletePost);
router.route("/getposts").get(getPosts);
router.route("/update/:postId/:userId").patch(verifyToken, updatePost);

export default router;