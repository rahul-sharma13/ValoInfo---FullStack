import { Router } from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "../controllers/User.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/update/:id").patch(verifyToken, updateUser);
router.route("/delete/:id").delete(verifyToken, deleteUser);
router.route("/getUsers").get(verifyToken, getUsers);
router.route("/getUser/:id").get(getUserById);

export default router;