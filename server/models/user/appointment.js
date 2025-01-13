import { Schema, model } from "mongoose";

// Define appointmentDetails as a sub-schema
const appointmentDetailsSchema = new Schema({
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: Date,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  clinic: {
    type: String,
    required: true,
  },
});

// Define the main appointment schema
const appointmentSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    socialSecurityNumber: {
      type: String,
      required: true,
      match: /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/, // Regex for validating SSN format
    },
    emergencyContactName: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
    emergencyContactPhone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    insuranceCompany: {
      type: String,
    },
    policyholderName: {
      type: String,
    },
    policyNumber: {
      type: String,
    },
    planName: {
      type: String,
    },
    referralInformation: {
      type: String,
    },
    appointmentDetails: {
      type: appointmentDetailsSchema,
      required: true,
    },
    reasonForVisit: {
      type: String,
      required: true,
    },
    preferredAppointmentDate: {
      type: Date,
      required: true,
    },
    preferredPhysician: {
      type: Schema.Types.ObjectId,
      ref: "physician",
      required: true,
    },
    specialRequirements: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  },
);

const Appointment = model("appointment", appointmentSchema);

export default Appointment;
