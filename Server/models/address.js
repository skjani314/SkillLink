import mongoose from "mongoose";


const addressSchema=new mongoose.Schema({

address:{required:true,type:String},
customer_id:{required:true,type:mongoose.Schema.Types.ObjectId,ref:'users'},
pincode:{required:true,type:Number}

});

const address=new mongoose.model('address',addressSchema);

export default address;