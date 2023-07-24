import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import connectDB from "./db/connectDb.js";
dotenv.config();

// Routes
import authRoute from "./Routes/authRoutes.js";
import postRoute from "./Routes/PostRoutes.js"
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("mongodb COnnected");
    app.listen(port, () => console.log("app is running in port " + port));
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use(errorHandler);

start();
