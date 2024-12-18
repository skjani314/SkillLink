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
import axios from 'axios';
import requests from './models/requests.js';

dotenv.config();
const app = express();


const upload_file = multer({ dest: 'uploads/' });
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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


    } catch (err) {
        next(err)
    }

})





app.post('/address', async (req, res, next) => {


    try {

        const { addr, customer_id, pincode } = req.body;

        const result = await address.create({ address: addr, customer_id, pincode })

        res.json(result);
    } catch (err) {
        next(err);
    }



})


app.get('/address', async (req, res, next) => {

    try {

        const { customer_id } = req.query;
        console.log(customer_id)
        const result = await address.find({ customer_id });
        console.log(result)
        res.json(result);
    } catch (err) {
        next(err);
    }

})

app.put('/address', async (req, res, next) => {

    try {

        const { id, addr, pincode } = req.body;
        const result = await address.findByIdAndUpdate({ _id: id }, { address: addr, pincode }, { new: true });
        res.json(result);
    } catch (err) {
        next(err);
    }



})


app.delete('/order', async (req, res, next) => {


    try {

        const { id } = req.body;

        const order_details = await orders.findById(id);

        if (order_details.status == 'cart') {

            const result = await orders.deleteOne({ _id: id });

            res.json(result);

        } else {
            res.json("have nothing to delete");
        }

    } catch (err) {

        next(err);
    }



})


app.post('/orders', async (req, res, next) => {


    try {

        const { customer_id, ser_pro_cost } = req.body;

        const data = await orders.findOne({ customer_id, ser_pro_cost, status: 'cart' });
        if (!data) {

            const result = await orders.create({ customer_id, ser_pro_cost, status: 'cart' });
            res.json(result);
        } else {
            next(new Error('service Already in cart'))
        }
    } catch (err) {
        next(err)
    }



});


app.get('/orders', async (req, res, next) => {


    try {

        const { user_id, customer_id, status } = req.query;

        if (user_id != null) {
            const ser_pro_data = await serviceProviders.findOne({ user_id })
            const result = await serprocost.find({ ser_pro: ser_pro_data._id });
            const ser_req_data = await Promise.all(

                result.map(async (each) => {

                    const requests = !status ? await orders.find({ ser_pro_cost: each._id, status: 'Request' }) : await orders.find({ ser_pro_cost: each._id, status: { $nin: ['Cart', 'Request'] } });
                    const { ser_id } = await locservice.findById(each.ser_loc_id);
                    const { name } = await services.findById(ser_id);

                    return { requests, cost: each.cost, ser_name: name };

                })
            )

            const data = await Promise.all(
                ser_req_data.map(async (each) => {
                    const { cost, ser_name, requests } = each;

                    const req_data = await Promise.all(requests.map(async (each) => {
                        const { date, customer_id, _id, status } = each;
                        const { name, mobile } = await User.findById(customer_id);
                        const add_data = await address.findById(each.address);
                        return { name, mobile, cost, ser_name, date, address, order_id: _id, address: add_data.address, status }

                    }))
                    return req_data;

                })
            )


            let final_data = [];
            data.map(each => {

                each.map(eachItem => {
                    final_data.push(eachItem);
                })

            })


            res.json(final_data);
        } else if (customer_id != null && status == 'cart') {

            const result = await orders.find({ customer_id, status: 'cart' });

            let x = 0;

            const data = await Promise.all(

                result.map(async (each) => {

                    const { cost, time, ser_loc_id, ser_pro } = await serprocost.findById(each.ser_pro_cost);
                    const { location, ser_id } = await locservice.findById(ser_loc_id);
                    const ser_data = await services.findById(ser_id);
                    const { user_id, proffision, rating } = await serviceProviders.findById(ser_pro);
                    const { name } = await User.findById(user_id);
                    x = x + cost;
                    return { cost, time, location, proffision, rating, ser_pro_name: name, img: ser_data.img, ser_name: ser_data.name, id: each._id }


                })
            )

            res.json({ data, x });

        } else if (customer_id != null) {
            const result = await orders.find({ customer_id, status: { $ne: 'cart' } });
            const data = await Promise.all(

                result.map(async (each) => {
                     const {status}=each;
                    const { cost, time, ser_loc_id, ser_pro } = await serprocost.findById(each.ser_pro_cost);
                    const { location, ser_id } = await locservice.findById(ser_loc_id);
                    const ser_data = await services.findById(ser_id);
                    const { user_id, proffision, rating } = await serviceProviders.findById(ser_pro);
                    const { name } = await User.findById(user_id);

                    return { cost, time, location, proffision, rating, ser_pro_name: name, img: ser_data.img, ser_name: ser_data.name ,status}


                })
            )

            res.json(data);

        } else {
            next(new Error('unable to find orders'));
        }

    } catch (err) {
        next(err)
    }




})

app.put('/orders', async (req, res, next) => {

    try {

        const { order_id, status, address } = req.query;

        if (status != null && address != null) {
            const result = await orders.findByIdAndUpdate({ _id: order_id }, { status, address, date: Date.now() }, { new: true })

            res.json(result);
        } else if (address != null) {
            const result = await orders.findByIdAndUpdate({ _id: order_id }, { address }, { new: true })
            res.json(result);
        } else if (status != null) {
            const result = await orders.findByIdAndUpdate({ _id: order_id }, { status }, { new: true })
            res.json(result);
        } else {
            res.sendStatus(500).json('nothing to update');
        }

    } catch (err) {
        next(err);
    }



})


app.delete('/orders', async (req, res, next) => {


    try {

        const { id } = req.query;

        const data = await orders.findById(id);
        if (data.status == 'cart') {


            const result = await orders.deleteOne({ _id: id });

            res.json(result);


        } else {
            next(new Error('unable to delete'))
        }
    } catch (err) {
        next(err);
    }



})

app.get('/serviceproviders', async (req, res, next) => {

    try {

        const { ser_id, id } = req.query;

        if (ser_id) {
            const { proffision, rating, user_id } = await serviceProviders.findOne({ _id: ser_id });
            const { name, img } = await User.findById(user_id);

            res.json({ proffision, rating, name, img })
        } else {
            const { proffision, rating, status, location, verified, verified_by } = await serviceProviders.findOne({ user_id: id });
            res.json({ proffision, rating, status, location, verified, verified_by });
        }

    } catch (err) {
        next(err)
    }





})


app.get('/agents', async (req, res, next) => {

    try {

        const { user_id, verified_by } = req.query;

        if (verified_by) {

            const agents_data = await agents.find({ verified_by })
            const data = await Promise.all(

                agents_data.map(async (each) => {
                    const { user_id, location } = each;
                    const { name, mobile, img } = await User.findById(user_id);
                    return { location, name, mobile, img }

                })
            )
            res.json(data)
        }
        else {
            const { location, verified,status } = await agents.findOne({ user_id: user_id })

            res.json({ location, verified ,status});
        }

    } catch (err) {
        next(err);
    }


})


app.post('/requests', async (req, res, next) => {


    try {

        const { req_from, proffision, location } = req.body;
   console.log(location)
        if (proffision) {
            const result = await serviceProviders.findOneAndUpdate({ user_id: req_from }, { proffision, location, status: true }, { new: true });
            console.log(result)
            const agent_data = await agents.findOne({ location })
            if (agent_data) {
                const { _id } = await User.findById(agent_data.user_id);
                const result = await requests.create({ req_to: _id, req_from, status: 'Pending' });

                res.json(result);
            } else {
                next(new Error('Location is Unavailable'))
            }
        } else {
            console.log(location);
          const data=  await agents.findByIdAndUpdate({ _id: req_from }, { location},{new:true});

            const admin_data = await User.findOne({ role: 'admin' })

            const result = await requests.create({ req_to: admin_data._id, req_from, status: 'Pending' });

            res.json(data);
        }



    } catch (err) {
        next(err)
    }





})


app.get('/requests', async (req, res, next) => {


    try {

        const { req_to, transaction_flag, req_from } = req.query;
        if (req_from != null) {
            const result = await requests.findOne({ req_from });
            console.log(result)
            res.json(result);
        }
        else {
            const req_data = await requests.find({ req_to, status: !transaction_flag ? 'Pending' : { $ne: 'Pending' } });
            const data = await Promise.all(

                req_data.map(async (each) => {
                    const { date, req_from, status } = each;
                    const { name, mobile } = await User.findById(req_from);
                    const x = await serviceProviders.findOne({ user_id: req_from });
                    if (x) {
                        return { date, name, mobile, proffision: x.proffision, location: x.location, req_id: each._id, req_ser_pro_id: x._id, status };
                    }
                    else {
                        const { _id, location } = await agents.findOne({ user_id: req_from })
                        return { date, name, mobile, req_id: each._id, req_agent_id: _id, status, location }
                    }
                })
            )
            res.json(data);
        }

    } catch (err) {
        next(err);
    }



})


app.put('/requests', async (req, res, next) => {


    try {

        const { req_id, status, rating, verified_by, req_ser_pro_id, req_agent_id } = req.query;

        const result = await requests.findByIdAndUpdate({ _id: req_id }, { status });
        if (status == "Accept" && req_ser_pro_id) {
            const ser_pro_update = await serviceProviders.findByIdAndUpdate(req_ser_pro_id, { rating, verified_by, verified: true })
            res.json({ ser_pro_update, result })
        }
        else if (status == "Accept" && req_agent_id) {
            const age_update = await agents.findByIdAndUpdate(req_agent_id, { verified_by, verified: true })
            res.json({ age_update, result })
        }
        else {
            res.json(result);
        }

    }
    catch (err) {
        next(err);

    }


})


app.put('/locservices', async (req, res, next) => {


    try {

        const { cost, time, id } = req.query;

        if (cost != null && time != null) {
            const result = await serprocost.findByIdAndUpdate({ _id: id }, { cost, time }, { new: true });
            res.json(result);
        } else if (cost != null) {
            const result = await serprocost.findByIdAndUpdate({ _id: id }, { cost }, { new: true });
            res.json(result);
        } else if (time != null) {
            const result = await serprocost.findByIdAndUpdate({ _id: id }, { time }, { new: true });
            res.json(result);
        } else {
            next(new Error('there is nothing to update'));
        }

    } catch (err) {

        next(err);
    }

});

//to get services data by location (admin)
app.get('/locservices', async (req, res, next) => {

    try {

        const { location } = req.query;
        const locservices = await locservice.find({ location });

        const services_inc = await Promise.all(
            locservices.map(async (each) => {

                const { ser_id } = each;
                const each_service = await services.findById(ser_id);
                const service_providers = await serprocost.find({ ser_loc_id: each._id });
                let max = 0;
                for (let i = 0; i < service_providers.length; i++) {

                    if (service_providers[i].cost > max) max = service_providers[i].cost;

                }


                return {
                    name: each_service.name,
                    img: each_service.img,
                    category: each_service.category,
                    service_providers: [...service_providers],
                    max,
                    ser_id,
                }

            })
        )


        res.json(services_inc);

    } catch (err) {

        next(err);
    }



})

//to decide which services available in particular location by agent
app.post('/locservices', async (req, res, next) => {

    try {

        const { pincode, ser_id, ser_pro, cost, time } = req.body;

        const is_locser = await locservice.findOne({ ser_id, location: pincode });
        if (is_locser == null) {
            const locser = await locservice.create({ ser_id, location: pincode });
            const serpro = await serprocost.create({ ser_loc_id: locser._id, ser_pro, cost, time });
        } else {
            const serpro = await serprocost.create({ ser_loc_id: is_locser._id, ser_pro, cost, time });

        }

        res.json("service added successfully");

    } catch (err) {
        next(err);
    }


})



app.get('/agent_serviceprovider', async (req, res, next) => {

    try {

        const { agent_id } = req.query;


        const result = await serviceProviders.find({ verified_by: agent_id })

        const data = await Promise.all(result.map(async (each) => {

            const { user_id, proffision, rating, _id } = each;
            const { name, img, mobile } = await User.findById(user_id)

            return { name, img, proffision, rating, mobile, ser_pro_id: _id }

        }))

        res.json(data);
    }
    catch (err) {
        next(err);
    }


})


app.post('/profile',async (req,res,next)=>{


try{

const {mobile,name,id}=req.body


const imgresult = await cloudinary.uploader.upload(req.files[0].path, {
    folder: 'users',
    public_id: id,
});

fs.unlinkSync(req.files[0].path);

const upresult=await User.findByIdAndUpdate(id,{mobile,name,img:imgresult.secure_url},{new:true})
res.json(upresult)


}
catch(err){
    next(err)
}



})

//work in progress
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


    } catch (err) {
        next(err);
    }



})

app.get('/services', async (req, res, next) => {


    try {
        const { category, name } = req.query;

        if (category != null) {

            const result = await services.find({ category });
            res.json(result);

        } else {
            console.log(name)
            let result;
            if (name == "") {
                result = await services.find({});

            } else {
                // Otherwise, find records that match the regex
                result = await services.find({ name: { $regex: new RegExp(name, 'i') } });
            }
            
            res.json(result);
        }
    } catch (err) {
        next(err);
    }



})

app.delete('/services', async (req, res, next) => {

    try {

        const { name } = req.body;

        const result = services.deleteOne({ name });

        res.json(result);


    } catch (err) {
        next(err);
    }



})


app.get('/ser_myservices', async (req, res) => {


    const { user_id } = req.query;
    const { _id } = await serviceProviders.findOne({ user_id: user_id });

    const ser_pro = await serprocost.find({ ser_pro: _id });
    const data = await Promise.all(
        ser_pro.map(async (each) => {
            const { ser_loc_id, time, cost } = each;
            const { ser_id, location } = await locservice.findById(ser_loc_id);
            const { img, name } = await services.findById(ser_id);
            return { cost, time, img, name, location, id: each._id }
        })

    )
    res.json(data);


})


app.post('/passchange', async (req, res, next) => {

    console.log(req.body);
    const { token } = req.body;
    const pass = req.body.data.password;

    try {

        await jwt.verify(token, process.env.KEY, async (err, decode) => {

            if (err) {
                next(err)
            } else {

                const email = decode.email;
                const hashpassword = await bcrypt.hash(pass, 10);
                console.log(hashpassword)
                const result = await User.findOneAndUpdate({ email }, { password: hashpassword }, { new: true, runValidators: true });
                res.status(200).json("Password changed");

            }


        })
    } catch (err) {
        next(err);
    }

})


app.post('/forget/verify', async (req, res, next) => {


    try {

        const token = req.body.token;
        await jwt.verify(token, process.env.KEY, (err, decode) => {

            if (err) {
                next(err);
            } else {
                res.json({ verified: true, email: decode.email });
                console.log(decode);

            }

        })
    } catch (err) {

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
        } else {


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
    html: `<html>
                    <body>
                      <h1>Hello,</h1>
                      <p>Your Reset link is:<br></br> <strong>${process.env.FRONTENDURL+'/forgot/' + token}</strong></p>
                      <p>Thank you!</p>
                    </body>
                  </html>`,
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


            res.sendStatus(200);

        }
    } catch (err) {

        next(err);

    }


})



app.post('/logout', (req, res, next) => {

    try {
        res.clearCookie('accessToken');

        return res.json("Logout sccessfully");
    } catch (error) {
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
        } else {
            const hashpassword = await bcrypt.hash(password, 10);

            const result = await User.create({ name, email, password: hashpassword, role, mobile, img: '' })

            if (role == 'supplier') {
                await serviceProviders.create({ user_id: result._id, status: false, rating: 0, proffision: '', location: 0, verified: false })
            } else if (role == 'agent') {
                await agents.create({ user_id: result._id, verified: false, location: 0 ,status:'Request'})
            } else {
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
        } else {
            const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

            const otp = generateOtp();

            const hashedOtp = await bcrypt.hash(otp, 10);

            const oldRecord = await Otp.findOne({ email });
            if (!oldRecord) {
                const newOtp = await Otp.create({ email, otp: hashedOtp });
            } else {
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
    subject: 'OTP Verification',
    html: `<html>
                    <body>
                      <h1>Hello,</h1>
                      <p>Your OTP code is: <strong>${otp}</strong></p>
                      <p>Thank you!</p>
                    </body>
                  </html>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


            res.status(200).json('email sent')

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
        } else {
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
        } else {

            const de_email = decode.email;
            console.log(de_email);
            const { name, email, img, role, mobile, _id } = await User.findOne({ email: de_email })
            res.json({ name, email, img, role, mobile, _id });
        }

    })


})

app.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
     console.log(email)

        const user = await User.findOne({ email });

        if (!user) {
            next(new Error("User Not Found"));
        }{

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
    }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({ error: true, message: err.message });
});



app.listen(process.env.PORT, () => { console.log("server is running") });