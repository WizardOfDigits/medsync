import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import UserRouter from "./routes/user.js";
import connection from "./connection.js";
import appointmentRouter from "./routes/appointment.js";
import { checkForAuthentication, restrictTo } from "./middleware/auth.js";

const app = express();
const port = 3000;

// Middleware setput
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

// connect mongodb
connection();

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.use("/user", UserRouter);
app.use("/appointment", restrictTo(["USER"]), appointmentRouter);

app.listen(port, () => {
  console.log(`Welcome to my nodeServer on port http://localhost:${port}`);
});

export default app;
