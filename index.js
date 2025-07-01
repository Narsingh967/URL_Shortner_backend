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

//Database Model
const urlSchema=new mongoose.Schema({
    originalUrl:String,
    shortUrl:String,
    clicks:{type:Number,default:0}

})

//Making model from above
const Url=mongoose.model('Url',urlSchema)


//Api for sending the url

app.post('/api/short',async(req,res)=>{
    try{
        const originalUrl = req.body?.originalUrl;
        if(!originalUrl){
            return res.status(400).json({message:"originalUrl is required"})
        }

        const shortUrl=nanoid(8)
        const url=new Url({originalUrl,shortUrl})

        await url.save();
        return res.status(200).json({message:"URL Generated",url:url})

    }

    catch(error){
        console.log(error)
        res.status(500).json({message:"Server error"})
    }
})


//Api for fetching the sort url

app.get("/shortUrl",async(req,res)=>{
    try{
        const {shortUrl}=req.params;
        if(!shortUrl){
            return res.status(400).json({message:"Original string is null"})
        }

        const url=await Url.findOne({shortUrl});
        return res.status(200).json({message:"Sorted Url:",url:url})
    }

    catch(error){
        console.log(error);
    }
})


app.listen(3000,()=>{
    console.log("Server is running at the port: 3000")
})

