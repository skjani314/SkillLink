import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';

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
  
app.post('/passchange',async (req,res)=>{

const token=req.body.token;
const password=req.body.password;

await jwt.verify(token,process.env.KEY,async (err,decode)=>{

if(err){
  res.json("token expired");
}
else
{

const email=decode.email;

const result=await User.findOneAndUpdate({email},{password},{ new: true, runValidators: true });

if(!result){}

}


})


})


app.post('/forget/verify',async (req,res)=>{

const token=req.body.token;
await jwt.verify(token,process.env.KEY,(err,decode)=>{

  if(err)
    {
      res.json({verified:false});
    }
    else{
      res.json({verified:true,email:decode.email});
      console.log(decode);
    }

})

});




app.post('/forget',async (req,res)=>{

try{

const {email}=req.body;
console.log(email);
const user=await User.findOne({email});

if(!user)
  {
    res.json("no user found");
  }
else{


const token=jwt.sign({email},process.env.KEY,{expiresIn:'5m'});

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'skilllinkforget@gmail.com',
      pass: process.env.EMAILPASSWORD
    }
  });
  
  const mailOptions = {
    from: 'skilllinkforget@gmail.com',
    to: email,
    subject: 'Forget Password',
    text: 'Your Password reset link is provided here and \n it will work only for 5 minuetes\n'+'http://192.168.236.207:3000/verify/'+token
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


}
}
catch(err){
  next(err);
}


})



app.post('/logout',(req,res)=>{

try{
res.clearCookie('accessToken');

return res.json("Logout sccessfully");
}
catch(error){
next(error);
}

})

  app.post('/register',async (req,res)=>{
try{ 
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
  
  } catch(error){
        next(error);
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
    

    app.use((err, req, res, next) => {
      console.error(err.stack)
      res.status(500).send('Something broke!')
    });



app.listen(process.env.PORT,()=>{console.log("server is running")});