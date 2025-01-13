import Physician from "../../models/physician/physician.js";
import { setUser } from "../../utils/auth.js";

export const signupHandler = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    gender,
    phoneNumber,
    specialization,
    experience,
    address,
    city,
  } = req.body;
  try {
    const physician = await Physician.findOne({ email });
    if (physician) {
      return res.status(400).json({ message: "Physician already exists" });
    }
    await Physician.create({
      firstName,
      middleName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      specialization,
      experience,
      address,
      city,
    });
    return res.status(201).json({ message: "Physician created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const physician = await Physician.findOne({ email });
    if (!physician) {
      return res.status(401).json({ message: "Physician not found" });
    }
    const isMatch = await physician.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = setUser(physician);
    res.cookie("token", token);
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
