import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.listen(port, () => {
  console.log(`Welcome to my nodeServer on port http://localhost:${port}`);
});

export default app;
