import { verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { createArticle, getArticle } from "../controllers/Article.controller.js";

const router = Router();

router.route("/create").post(verifyToken, createArticle);
router.route("/get/:slug").get(getArticle);

export default router;