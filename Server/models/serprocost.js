import mongoose from "mongoose";

const serprocostSchema = new mongoose.Schema({

ser_loc_id:{type:mongoose.Schema.Types.ObjectId,ref:"locservice"},
ser_pro:{type:mongoose.Schema.Types.ObjectId,ref:"serviceProviders"},
cost:Number,
time:Number,
  
});



const serprocost = mongoose.model('serprocost', serprocostSchema);
 
export default serprocost;