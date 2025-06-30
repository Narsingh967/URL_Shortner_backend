import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
dotenv.config();

const app=express();
app.use(cors())
app.use(express.json());

//Making connection with the database (mongoose)
mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log("Db connected successfully"))
.catch((err)=> console.log("Failed to connect database: ",err))

app.listen(3000,()=>{
    console.log("Server is running at the port: 3000")
})

