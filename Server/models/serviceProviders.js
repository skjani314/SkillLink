import mongoose from "mongoose";
import User from "./User.js";
import serprocost from "./serprocost.js";

const serviceProviderSchema = new mongoose.Schema({

user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'users'
},
proffision:String,
rating:Number,
status:Boolean,
location:Number,
verified:Boolean,
verified_by:{type:mongoose.Schema.Types.ObjectId,ref:'users'}

});

serviceProviderSchema.pre('remove',async (next)=>{

    try{

await User.deleteMany({_id:this.user_id})
await serprocost.deleteMany({ser_pro:this._id})
        next()
    }
catch(err){
    next(err)
}
})



const serviceProviders = mongoose.model('serviceproviders', serviceProviderSchema);
 
export default serviceProviders;