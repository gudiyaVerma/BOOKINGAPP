import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
dotenv.config()
 
mongoose.set("strictQuery", false);
const connect = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to MONGODB");
  } catch (error) {
    throw error;
  }
 };
 
 mongoose.connection.on("disconnected",()=>{
  console.log("mongoDB disconnected!")
 })

 app.use(cors());
 app.use(cookieParser());
 app.use(express.json());
 

 app.use("/api/auth",authRoute);
 app.use("/api/hotels",hotelsRoute);
 app.use("/api/users",usersRoute);
 app.use("/api/rooms",roomsRoute);

  app.use((err,req,res,next)=>{ // order must always be in this manner,otherwise it won't gonna work
  // for throwing the specific error
  const errorStatus=err.status || 500;
  const errorMessage=err.message ||"Something went wrong!";
  return res.status(errorStatus).json(
    {
      success:false,
      status:errorStatus,
      message:errorMessage,
      stack : err.stack, // gives more information about error 
    });
 })
 
 app.listen(8800,()=>{
  connect();
  console.log("connected to backend!");
 })