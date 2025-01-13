import appointment from "../../models/user/appointment.js";

// Utility function to validate required fields
const validateAppointmentData = (data) => {
  const requiredFields = [
    "address",
    "city",
    "socialSecurityNumber",
    "emergencyContactName",
    "emergencyContactPhone",
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`${field} is required`);
    }
  }
};

// Common fields that can be updated
const appointmentFields = [
  "address",
  "city",
  "socialSecurityNumber",
  "emergencyContactName",
  "relation",
  "emergencyContactPhone",
  "policyholderName",
  "insuranceCompany",
  "policyNumber",
  "planName",
  "referralInformation",
  "appointmentDetails",
  "reasonForVisit",
  "previousVisitDetails",
  "specialRequirements",
];

// Helper function to update appointment fields
const updateAppointmentFields = (existingAppointment, updates) => {
  appointmentFields.forEach((field) => {
    if (updates[field]) {
      existingAppointment[field] = updates[field];
    }
  });
};

// Create new appointment
const createAppointmentHandler = async (req, res) => {
  try {
    // Validate required fields
    validateAppointmentData(req.body);

    const appointmentData = {
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    };

    await appointment.create(appointmentData);

    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
    });
  } catch (error) {
    console.error("Create Appointment Error:", error);
    return res.status(error.name === "ValidationError" ? 400 : 500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// Edit existing appointment
const editAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find appointment
    const existingAppointment = await appointment.findById(id);
    if (!existingAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check authorization
    if (existingAppointment.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to edit this appointment",
      });
    }

    // Update fields
    updateAppointmentFields(existingAppointment, updates);
    existingAppointment.updatedBy = req.user._id;

    // Save changes
    await existingAppointment.save();

    return res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
    });
  } catch (error) {
    console.error("Edit Appointment Error:", error);
    return res.status(error.name === "ValidationError" ? 400 : 500).json({
      success: false,
      message: error.message || "Error editing appointment",
    });
  }
};

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

// list  all appointments
const listAppointments = async (req, res) => {
  try {
    const appointments = await appointment.find({ createdBy: req.user._id });
    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    console.error("List Appointments Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching appointments",
    });
  }
};

export {
  createAppointmentHandler,
  editAppointment,
  listAppointments,
  requireAuth,
  errorHandler,
};
