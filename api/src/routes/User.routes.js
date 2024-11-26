import { Router } from "express";
import {
  adminManage,
  deleteUser,
  getUserById,
  getUserByUsername,
  getUsers,
  updateUser,
} from "../controllers/User.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/update/:id").put(verifyToken, updateUser);
router.route("/delete/:id").delete(verifyToken, deleteUser);
router.route("/getUsers").get(verifyToken, getUsers);
router.route("/getUser/:id").get(getUserById);
router.route("/:username").get(getUserByUsername);
router.route("/manageAdmin/:username").put(verifyToken, adminManage);

export default router;
