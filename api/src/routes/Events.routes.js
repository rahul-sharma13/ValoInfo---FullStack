import express from "express";
import { createEvent, getEvents, getStatus } from "../controllers/Events.controller.js";

const router = express.Router();

router.route("/create").post(createEvent);
router.route("/all").get(getEvents);
router.route("/basedOnStatus").get(getStatus);

export default router;