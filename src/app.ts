import express, { urlencoded } from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./dababase.js";
import { errorMiddleware } from "./middleware/error.js";
import { userLogin, userRegistration } from "./controller/user.js";
import cors from "cors";

const app = express();

config({
  path: "./.env",
});

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || ""
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";

connectDB(MONGO_URI);



app.get("/", (req, res, next) => {
  res.send("Hellow world");
});

app.post("/user/register", userRegistration);
app.post("/user/login", userLogin);


app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`sever is running on port ${PORT}`);
})