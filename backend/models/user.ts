import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    
},{timestamps:true})

const User = mongoose.model('users',userSchema)
export default User