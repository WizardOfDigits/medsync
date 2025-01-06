import User from "../models/user.js";

export const signupHandler = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      dob,
      gender,
      phone,
      address,
      city,
      email,
      password,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new User
    await User.create({
      firstName,
      middleName,
      lastName,
      dob,
      gender,
      phone,
      address,
      city,
      email,
      password,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    res.end();
  }
};

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    res.json({ message: "login sucessfull" });
  } catch (error) {
    console.log(error);
  }
};
