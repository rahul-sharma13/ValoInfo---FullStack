import express from "express";
import { createEvent, getEvents } from "../controllers/Events.controller.js";

const router = express.Router();

router.route("/create").post(createEvent);
router.route("/all").get(getEvents);

export default router;