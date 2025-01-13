import { Router } from "express";
import {
  createAppointmentHandler,
  editAppointment,
  listAppointments,
} from "../../controllers/user/appointmentDetails.js";

const router = Router();
router.post("/create-appointment", createAppointmentHandler);
router.post("/edit-appointment/:id", editAppointment);
router.get("/list-appointments", listAppointments);
export default router;
