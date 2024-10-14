import mongoose from "mongoose";

const locserviceSchema = new mongoose.Schema({

ser_id:Object,
location:String

});

const locservice = mongoose.model('locservice', locserviceSchema);
 
export default locservice;