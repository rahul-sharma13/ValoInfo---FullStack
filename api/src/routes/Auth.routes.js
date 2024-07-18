import express from "express";
import { googleSignIn, SignIn, signOut, SignUp } from "../controllers/Auth.controller.js";

const router = express.Router();

router.route("/signup").post(SignUp);
router.route("/signin").post(SignIn);
router.route("/signout").get(signOut);
router.route("/googlesignin").post(googleSignIn);

export default router;