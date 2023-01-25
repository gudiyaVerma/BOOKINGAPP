 import express from "express";
 import { trusted } from "mongoose";
 import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
 import Hotel from "../models/Hotel.js";
 import { createError } from "../utils/error.js";
 import { verifyAdmin } from "../utils/verifyToken.js";
 const router = express.Router();


 //create
    router.post("/",verifyAdmin ,(createHotel));
 //update

 router.put("/:id",verifyAdmin, (updateHotel));
 //delete
 
 router.delete("/find/:id", verifyAdmin, deleteHotel);

 //get

 router.get("/:id",(getHotel));

 //get all

 router.get("/",(getHotels));
 router.get("/count/countByCity",(countByCity));
 router.get("/counting/countByType",(countByType)); 
 router.get("/room/:id", getHotelRooms);
 export default router;