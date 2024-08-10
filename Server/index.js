import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';


dotenv.config();
const app=express();
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
})) 

mongoose.connect('mongodb+srv://skskjani7:'+process.env.PASSWORD+'@users.3kyxw.mongodb.net/SkillLink',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.post('/register',async (req,res)=>{
    const {name,email,password,phone,address,pincode,role}=req.body;
  
    const user=await User.findOne({email});

    if(user)
      {
        res.json("User Already Exist With Given Email");
      }
      else{
       const hashpassword=await bcrypt.hash(password,10);

      await User.create({name,email,password:hashpassword,role,phone,address,pincode})
      .then(user=>res.json(user))
      .catch(err=>res.json(err))
  }
    
    });





app.listen(process.env.PORT,()=>{console.log("server is running")});