import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    productId:[{
        type:mongoose.Types.ObjectId,
        ref:'products',
        required:true
    }],
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'processing',
        enum:['processing','approval','delivered','cancel']
    }
},{timestamps:true})


const Order = mongoose.model('orders',orderSchema)