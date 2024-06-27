import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPercentage:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        default:5
    },
    category:{
        type:String,
        required:true,
        enum:['tv','monitor','laptop','ear bud','mouse','keyboard','pc','phone','charger','tablet']
    },
    productImg:{
        type:String,
        required:true
    }

},{timestamps:true})

const Product = mongoose.model('products',productSchema)
export default Product