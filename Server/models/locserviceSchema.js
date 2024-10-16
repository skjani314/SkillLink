import mongoose from "mongoose";
import serprocost from "./serprocost.js";

const locserviceSchema = new mongoose.Schema({

ser_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'services'
},
location:Number

});

locserviceSchema.pre('remove',async (next)=>{

    try{

await serprocost.deleteMany({ser_loc_id:this._id})

        next()
    }
catch(err){
    next(err)
}
})

const locservice = mongoose.model('locservice', locserviceSchema);
 
export default locservice;