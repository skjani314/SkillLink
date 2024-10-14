import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({

name:String,
img:String,
category:String,

});

const services = mongoose.model('services', serviceSchema);
 
export default services;