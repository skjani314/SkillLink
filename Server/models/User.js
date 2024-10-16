import mongoose from 'mongoose';


const UserSchema=new mongoose.Schema(
    {
        name:String,
        email:{type:String,unique:true},
        password:String,
        mobile:Number,
        role:String,
        img:String
    });
const User=new mongoose.model("users",UserSchema);

export default User;