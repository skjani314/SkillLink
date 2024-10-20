import mongoose, { mongo } from "mongoose";

const ordersSchema=new mongoose.Schema({

date:{type:Date,default:Date.now()},
customer_id:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
ser_pro_cost:{type:mongoose.Schema.Types.ObjectId,ref:'serprocost',required:true},
adress:{type:mongoose.Schema.Types.ObjectId,ref:'address'},
status:{required:true,type:String}

})

const orders=new mongoose.model('orders',ordersSchema);

export default orders;