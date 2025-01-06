import express from "express";
import cors from "cors";

import UserRouter from "./routes/user.js";
import connection from "./connection.js";

const app = express();
const port = 3000;

// Middleware setput
app.use(express.json());
app.use(cors());

// connect mongodb
connection();

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.use("/user", UserRouter);

app.listen(port, () => {
  console.log(`Welcome to my nodeServer on port http://localhost:${port}`);
});

export default app;
