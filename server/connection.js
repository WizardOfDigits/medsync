import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/medsync");
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default connection;
