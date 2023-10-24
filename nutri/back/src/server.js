import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";

const app = express();


app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (request, response) => {
  return response.status(200).json({ message: "Fonsi!" });
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

export default app;