import mongoose from "mongoose";
import User from "./User.js";

const agentSchema = new mongoose.Schema({

user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'users'
},
verified:Boolean,
location:Number,
verified_by:{type:mongoose.Schema.Types.ObjectId,ref:'users'}

});

agentSchema.pre('remove',async (next)=>{

    try{

await User.deleteMany({_id:this.user_id})
        next()
    }
catch(err){
    next(err)
}
})



const agents = mongoose.model('agents', agentSchema);
 
export default agents;