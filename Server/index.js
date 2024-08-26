import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';
import Otp from './models/Otp.js';

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
  
app.post('/passchange',async (req,res,next)=>{

 
 try{ 
const token=req.body.token;
const password=req.body.password;

await jwt.verify(token,process.env.KEY,async (err,decode)=>{

if(err){
      next(err)
}
else
{

const email=decode.email;

const result=await User.findOneAndUpdate({email},{password},{ new: true, runValidators: true });

res.status(200).json("Password changed");

}


})
 }
 catch(err)
 {
  next(err);
 }

})


app.post('/forget/verify',async (req,res,next)=>{


try{

const token=req.body.token;
await jwt.verify(token,process.env.KEY,(err,decode)=>{

  if(err)
    {
    next(err);
    }
    else{
      res.json({verified:true,email:decode.email});
      console.log(decode);

    }

})
}
catch(err)
{

  next(err);

}

});




app.post('/forget',async (req,res,next)=>{

try{

const {email}=req.body;
console.log(email);
const user=await User.findOne({email});

if(!user)
  {
       next(new Error("User Not Found"));
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
    text: 'Your Password reset link is provided here and \n it will work only for 5 minuetes\n'+'http://192.168.68.207:3000/forgot/'+token
  };
  
 await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 res.sendStatus(200);

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
    const {name,email,password,mobile}=req.body.FormData;
    const {role}=req.body;
    const user=await User.findOne({email});

    if(user)
      {
        next(new Error("user Already Found"));
      }
      else{
       const hashpassword=await bcrypt.hash(password,10);

      await User.create({name,email,password:hashpassword,role,mobile,address:'',pincode:''})
      .then(user=>res.json(user))
      .catch(err=>res.json(err))
      }
  
  } catch(error){
        next(error);
  } 
    
    });

app.post('/send-otp',async (req,res,next)=>{

  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (user) {
      next(new Error('user already found'));
    }
    else{
    const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

    const otp = generateOtp();

    const hashedOtp = await bcrypt.hash(otp,10);
   
    const oldRecord= await Otp.findOne({email});
if(!oldRecord){
    const newOtp = await Otp.create({ email , otp: hashedOtp });
  }
  else{
    await Otp.deleteOne({email});
    const newOtp = await Otp.create({ email , otp: hashedOtp });
  }

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
      subject: 'Account Verification',
      text: 'Your account Verification OTP\n'+otp
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  res.status(200).json({ error:false});}
  } catch (error) {
        next(error);
  }
});

 
app.post('/verify-otp',async (req,res,next)=>{

  const { email, otp } = req.body;

  try {
    
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      next(new Error('invalid Otp'));
    }
else{
    // Compare OTP
    const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isOtpValid) {
           next(new Error('invalid OTP'));
    }else{

    await Otp.deleteOne({ email });

    res.status(200).json({ message: 'OTP verified successfully' });}
  }
  } catch (error) {
      next(error);
  }
});

app.post('/get-user',async (req,res,next)=>{


const accessToken=req.cookies.accessToken;
if(!accessToken)return res.json(null);
await jwt.verify(accessToken,process.env.KEY,async (err,decode)=>{

if(err)
  {
    next(err);
  }
  else
  {
  
    const email=decode.email;
    console.log(email);
     const user= await User.findOne({email})
     res.json(user);
  }

})


})

    app.post('/login', async (req, res,next) => {
      try {
        const { email, password } = req.body;
    
    
        const user = await User.findOne({ email });
    
        if (!user) {
          next(new Error("User Not Found"));
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
      console.error(err.stack);
     return res.status(500).json({error:true});
    });



app.listen(process.env.PORT,()=>{console.log("server is running")});