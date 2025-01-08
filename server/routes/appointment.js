import { Router } from "express";
import { createAppointmentHandler } from "../controllers/appointmentDetails.js";

const router = Router();
router.post("/create-appointment", createAppointmentHandler);

export default router;
