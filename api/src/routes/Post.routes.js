import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPosts,
  getUserPosts,
  updatePost,
  upvotePost,
} from "../controllers/Post.controller.js";

const router = Router();

router.route("/create").post(verifyToken, createPost);
router.route("/delete/:id").delete(verifyToken, deletePost);
router.route("/getposts").get(getPosts);
router.route("/getuserposts/:userId").get(getUserPosts);
router.route("/update/:postId/:userId").put(verifyToken, updatePost);
router.route("/upvote/:postId").put(verifyToken, upvotePost);
router.route("/getAllPosts").get(getAllPosts);

export default router;
