import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';


dotenv.config();
const app=express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
})) 

mongoose.connect('mongodb+srv://skskjani7:'+process.env.PASSWORD+'@users.3kyxw.mongodb.net/?retryWrites=true&w=majority&appName=Users',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

