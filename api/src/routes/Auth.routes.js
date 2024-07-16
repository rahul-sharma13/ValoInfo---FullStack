import express from "express";
import { SignIn, signOut, SignUp } from "../controllers/Auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/signup").post(SignUp);
router.route("/signin").post(SignIn);
router.route("/signout").get(signOut);

export default router;