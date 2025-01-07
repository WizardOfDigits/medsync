import { Schema, model } from "mongoose";

const appointmentSchema = new Schema({
  // patientId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "user",
  // },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  socialSecurityNumber: {
    type: Number,
    required: true,
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
    type: Number,
    required: true,
  },
  insuranceCompany: {
    type: String,
    required: true,
  },
  policyholdersName: {
    type: String,
  },
  policyNumber: {
    type: Number,
  },
  groupNumber: {
    type: Number,
  },
  planName: {
    type: String,
  },
  referralInformation: {
    type: String,
  },
  appointmentDetails: {
    type: String,
    required: true,
  },
  ReasonForVisit: {
    type: String,
    required: true,
  },
  preferredAppointmentDate: {
    type: Date,
  },
  preferredPhysician: {
    type: Schema.Types.ObjectId,
    ref: "physician",
  },
  specialRequirements: {
    type: String,
  },
});

const Appointment = model("appointment", appointmentSchema);

export default Appointment;
