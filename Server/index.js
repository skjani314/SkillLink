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
import services from './models/services.js';
import serprocost from './models/serprocost.js';
import locservice from './models/locserviceSchema.js';
import serviceProviders from './models/serviceProviders.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import agents from './models/agents.js';
import orders from './models/orders.js';
import address from './models/address.js';




dotenv.config();
const app = express();
const upload_file = multer({ dest: 'uploads/' });
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

mongoose.connect('mongodb+srv://skilllinkforget:' + process.env.PASSWORD + '@skilllink.z4fk4.mongodb.net/SkillLink', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(upload_file.array('img'));

cloudinary.config({
  cloud_name: 'dyominbfs',
  api_key: process.env.CLOUDNIR_API_KEY,
  api_secret: process.env.CLOUDNIR_API_SECRET,
});


app.post('/test', async (req, res, next) => {

  try {

    const result = await cloudinary.uploader.upload(req.files[0].path, {
      folder: 'users',
      public_id: 'jani'
    });

    fs.unlinkSync(req.files[0].path);

    res.json({
      message: 'Image uploaded successfully',
      url: result.secure_url,
    });


  }
  catch (err) {
    next(err)
  }

})





app.post('address',async (req,res,next)=>{


try{

const {addr,customer_id,pincode}=req.body;

const result=await address.create({address:addr,customer_id,pincode})

res.json(result);
}  
catch(err)
{
  next(err);
}



})


app.get('address',async (req,res,next)=>{

try{

const {customer_id}=req.body;

const result=await address.find(customer_id);
res.json(result);
}
catch(err)
{
  next(err);
}

})

app.put('/address',async (req,res,next)=>{

try{

const {id,addr,pincode}=req.body;  
const result=await address.findByIdAndUpdate({_id:id},{address:addr,pincode},{new:true});
res.json(result);
}
catch(err)
{
  next(err);
}



})


app.delete('/order',async (req,res,next)=>{


try{

const {id}=req.body;

const order_details=await orders.findById(id);

if(order_details.status=='cart'){

const result=await orders.deleteOne({_id:id});

res.json(result);

}
else{
  res.json("have nothing to delete");
}

}  
catch(err)
{

  next(err);
}



})


app.post('/orders',async (req,res,next)=>{


try{

const {customer_id,ser_pro_cost,address}=req.body;


const result=await orders.create({customer_id,ser_pro_cost,address,status:'cart'});
res.json(result);


}  
catch(err){
  next(err)
}



});


app.get('/orders',async (req,res,next)=>{


try{

const {ser_pro_cost,customer_id,status}=req.body;

if(ser_pro_cost!=null){
const result=await orders.find({ser_pro_cost,status:{$ne:'cart'}});
res.json(result);
}
else if(customer_id!=null && status=='cart')
{

const result =await orders.find({customer_id,status:'cart'});
res.json(result);

}
else if(customer_id!=null){
  const result=await orders.find({customer_id,status:{$ne:'cart'}});
  res.json(result);

}
else{
  next(new Error('unable to find orders'));
}

}
catch(err)
{
  next(err)
}




})

app.put('/orders',async (req,res,next)=>{

try{

const {order_id,status}=req.body;

const result=await orders.findByIdAndUpdate({_id:order_id},{status},{ new: true })

res.json(result);

}
catch(err){
  next(err);
}



})

//details of service providers
app.get('/serviceproviders',async (req,res,next)=>{

try{

const {ser_id}=req.body;

const ser_result=await serviceProviders.findById(ser_id);
const {name,img}=await User.findById(ser_result.user_id);

res.json({...ser_result,name,img})


}
catch(err){
  next(err)
}





})





//to get services data by location (admin)
app.get('/locservices', async (req, res, next) => {

  try {

    const { location } = req.params;
   console.log(req.params);

   const locservices = await locservice.find({ location });

    const services_inc = await Promise.all(
      locservices.map(async (each) => {

        const { ser_id } = each;
        const each_service = await services.findById(ser_id);
        const service_providers = await serprocost.find({ ser_loc_id: each._id });
        let max=0;
        for(let i=0;i<service_providers.length;i++)
          {

            if(service_providers[i].cost>max)max=service_providers[i].cost;

          }


        return {
          name: each_service.name,
          img: each_service.img,
          category: each_service.category,
          service_providers: [...service_providers],
          max,
        }

      })
    )


    res.json(services_inc);

  }
  catch (err) {

    next(err);
  }



})

//to decide which services available in particular location by agent
app.post('/locservices', async (req, res, next) => {

  try {

    const { pincode, ser_id, ser_pro, cost } = req.body;

    const is_locser = await locservice.findOne({ ser_id, location: pincode });
    if (is_locser == null) {
      const locser = await locservice.create({ ser_id, location: pincode });
      const serpro = await serprocost.create({ ser_loc_id: locser._id, ser_pro, cost });
    }
    else {
      const serpro = await serprocost.create({ ser_loc_id: is_locser._id, ser_pro, cost });

    }

    res.json("service added successfully");

  }
  catch (err) {
    next(err);
  }


})


app.post('/services', async (req, res, next) => {


  try {

    const { ser_name, category } = req.body;
    const imgresult = await cloudinary.uploader.upload(req.files[0].path, {
      folder: 'services',
      public_id: ser_name,
    });

    fs.unlinkSync(req.files[0].path);

    const response = await services.create({ category, img: imgresult.secure_url, name: ser_name });

    res.json(response);

  }
  catch (err) {
    next(err);
  }



})

app.get('/services', async (req, res, next) => {


  try {
    const { category, name } = req.body;

    if (category != null) {

      const result = await services.find({ category });
      res.json(result);

    }
    else {
      const result = await services.find({ name: { $regex: new RegExp(name, 'i') } });
      console.log(result)
      res.json(result);
    }
  }
  catch (err) {
    next(err);
  }



})

app.delete('/services', async (req, res, next) => {

  try {

    const { name } = req.body;

    const result = services.deleteOne({ name });

    res.json(result);


  }
  catch (err) {
    next(err);
  }



})



app.post('/passchange', async (req, res, next) => {

  console.log(req.body);
  const { token } = req.body;
  const pass = req.body.data.password;

  try {

    await jwt.verify(token, process.env.KEY, async (err, decode) => {

      if (err) {
        next(err)
      }
      else {

        const email = decode.email;
        const hashpassword = await bcrypt.hash(pass, 10);
        console.log(hashpassword)
        const result = await User.findOneAndUpdate({ email }, { password: hashpassword }, { new: true, runValidators: true });
        res.status(200).json("Password changed");

      }


    })
  }
  catch (err) {
    next(err);
  }

})


app.post('/forget/verify', async (req, res, next) => {


  try {

    const token = req.body.token;
    await jwt.verify(token, process.env.KEY, (err, decode) => {

      if (err) {
        next(err);
      }
      else {
        res.json({ verified: true, email: decode.email });
        console.log(decode);

      }

    })
  }
  catch (err) {

    next(err);

  }

});




app.post('/forget', async (req, res, next) => {

  try {

    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email });

    if (!user) {
      next(new Error("User Not Found"));
    }
    else {


      const token = jwt.sign({ email }, process.env.KEY, { expiresIn: '5m' });

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
        text: 'Your Password reset link is provided here and \n it will work only for 5 minuetes\n' + 'http://192.168.245.207:3000/forgot/' + token
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.sendStatus(200);

    }
  }
  catch (err) {

    next(err);

  }


})



app.post('/logout', (req, res, next) => {

  try {
    res.clearCookie('accessToken');

    return res.json("Logout sccessfully");
  }
  catch (error) {
    next(error);
  }

})

app.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body.FormData;
    const { role } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      next(new Error("user Already Found"));
    }
    else {
      const hashpassword = await bcrypt.hash(password, 10);

      const result = await User.create({ name, email, password: hashpassword, role, mobile,img:'' })

      if (role == 'supplier') {
        await serviceProviders.create({ user_id: result._id, status: false, rating: 0, proffision: '', location: 0 ,verified:false})
      }
      else if (role == 'agent') {
        await agents.create({ user_id: result._id, verified: false, location: 0 })
      }
      else {
        console.log('customer');
      }
      res.json(result);

    }

  } catch (error) {
    next(error);
  }

});

app.post('/send-otp', async (req, res, next) => {

  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (user) {
      next(new Error('user already found'));
    }
    else {
      const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

      const otp = generateOtp();

      const hashedOtp = await bcrypt.hash(otp, 10);

      const oldRecord = await Otp.findOne({ email });
      if (!oldRecord) {
        const newOtp = await Otp.create({ email, otp: hashedOtp });
      }
      else {
        await Otp.deleteOne({ email });
        const newOtp = await Otp.create({ email, otp: hashedOtp });
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
        text: 'Your account Verification OTP\n' + otp
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.status(200).json({ error: false });
    }
  } catch (error) {
    next(error);
  }
});


app.post('/verify-otp', async (req, res, next) => {

  const { email, otp } = req.body;

  try {

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      next(new Error('invalid Otp'));
    }
    else {
      // Compare OTP
      const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
      if (!isOtpValid) {
        next(new Error('invalid OTP'));
      } else {

        await Otp.deleteOne({ email });

        res.status(200).json({ message: 'OTP verified successfully' });
      }
    }
  } catch (error) {
    next(error);
  }
});

app.post('/get-user', async (req, res, next) => {


  const accessToken = req.cookies.accessToken;
  if (!accessToken) next(new Error("jwt token not found"));
  await jwt.verify(accessToken, process.env.KEY, async (err, decode) => {

    if (err) {
      next(err);
    }
    else {

      const email = decode.email;
      console.log(email);
      const user = await User.findOne({ email })
      res.json(user);
    }

  })


})

app.post('/login', async (req, res, next) => {
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
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'none',
        path: '/',

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
  return res.status(500).json({ error: true });
});



app.listen(process.env.PORT, () => { console.log("server is running") });