import mongoose from "mongoose";
import locservice from "./locserviceSchema.js";

const serviceSchema = new mongoose.Schema({

name:{
    type:String,
    required:true,
    unique:true
},
img:String,
category:String,

}); 

serviceSchema.pre('remove',async (next)=>{

    try{

await locservice.deleteMany({ser_id:this._id})

        next()
    }
catch(err){
    next(err)
}
})



const services = mongoose.model('services', serviceSchema);
 
export default services;