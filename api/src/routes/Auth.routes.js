import express from "express";
import { SignUp } from "../controllers/Auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/signup").post(
  upload.single("avatar"),
  SignUp
);

export default router;
