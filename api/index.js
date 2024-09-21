import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js"
import cookieParser from "cookie-parser";
import path from 'path'
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve()

const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(8888, () => {
  console.log("server is running on port 8888!!!!!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter)

app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*' , (req,res) => {
  res.sendFile(path.join(__dirname, 'client','dist','index.html'))
})

app.use((err, req, res, next) => {
  const statusCode = err.statuscode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
