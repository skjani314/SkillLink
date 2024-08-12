import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());


app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
})) 

mongoose.connect('mongodb+srv://skskjani7:'+process.env.PASSWORD+'@users.3kyxw.mongodb.net/SkillLink',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  

app.post('/logout',(req,res)=>{

res.clearCookie('accessToken');

return res.json("Logout sccessfully");

})

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

    app.post('/login', async (req, res) => {
      try {
        const { email, password } = req.body;
    
    
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (isMatch) {
          const accessToken = jwt.sign({ email }, process.env.KEY, { expiresIn: '7d' });
    
          res.cookie('accessToken ', accessToken, {
            httpOnly: true, 
            maxAge: 7*24*60*60*1000, 
            secure: true,
            sameSite:'none',
            path:'/',

          });
    
          return res.status(200).json("logged in sucessfully");
        } else {
          return res.status(401).json({ message: "Password incorrect" });
        }
      } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
      }
    });
    




app.listen(process.env.PORT,()=>{console.log("server is running")});