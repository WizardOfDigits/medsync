import appointment from "../models/user/appointment.js";

export const createAppointmentHandler = async (req, res) => {
  const {
    address,
    city,
    socialSecurityNumber,
    emergencyContactName,
    relation,
    emergencyContactPhone,
    insuranceCompany,
    policyNumber,
    groupNumber,
    planName,
    referralInformation,
    appointmentDetails,
    ReasonForVisit,
    previousVisitDetails,
    specialRequirements,
  } = req.body;

  try {
    await appointment.create({
      address,
      city,
      socialSecurityNumber,
      emergencyContactName,
      relation,
      emergencyContactPhone,
      insuranceCompany,
      policyNumber,
      groupNumber,
      planName,
      referralInformation,
      appointmentDetails,
      ReasonForVisit,
      previousVisitDetails,
      specialRequirements,
    });
    res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
