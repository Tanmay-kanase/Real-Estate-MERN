import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(8888, () => {
  console.log("server is running on port 8888!!!!!");
});

