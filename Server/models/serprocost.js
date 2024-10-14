import mongoose from "mongoose";

const serprocostSchema = new mongoose.Schema({

ser_loc_id:Object,
ser_pro:{type:Object,ref:"User"},
cost:Number

});

const serprocost = mongoose.model('serprocost', serprocostSchema);
 
export default serprocost;