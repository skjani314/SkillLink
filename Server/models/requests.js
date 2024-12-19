import mongoose from 'mongoose';

const requestsScema=new mongoose.Schema({

date:{type:Date,default:Date.now()},
req_to:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
req_from:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
status:String,

})

const requests=new mongoose.model('requests',requestsScema);

export default requests;