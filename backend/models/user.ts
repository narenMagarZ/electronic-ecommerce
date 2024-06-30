import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Types.ObjectId,
        ref:'products',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
},{timestamps:true})

const billingAddressSchema  = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    province:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
})
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    profilePic:{
        type:String,
        default:''
    },
    cart:[cartSchema],
    billingAddress:{
        type:billingAddressSchema,
        default:{}
    }
    
},{timestamps:true})

const User = mongoose.model<{
    fullName:string
    email:string,
    password:string
    profilePic:string
    cart:{
        productId:string
        quantity:number
        price:number,
        discountPercentage:number
    }[]
    billingAddress:{
        fullName:string
        phoneNumber:number
        province:string
        city:string
        area:string
        address:string
    }
}>('users',userSchema)
export default User