import mongoose from 'mongoose';


const UserSchema=new mongoose.Schema({name:String,email:String,password:String,phone:Number,address:String,pincode:String,role:String});
const User=new mongoose.model("users",UserSchema);

export default User;