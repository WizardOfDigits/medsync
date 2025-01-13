import { Schema, model } from "mongoose";
import { hashPassword, comparePassword } from "../../utils/passwordUtils.js";

const physicianSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "PHYSICIAN",
    },
  },
  { timestamps: true },
);

// Pre-save hook to hash password
physicianSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

// Compare password method
physicianSchema.methods.comparePassword = async function (password) {
  return comparePassword(password, this.password);
};

const Physician = model("physician", physicianSchema);
export default Physician;
