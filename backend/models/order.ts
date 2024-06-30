import mongoose from 'mongoose'

const orderedProductSchema = new mongoose.Schema({
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
    cost:{
        type:Number,
        required:true
    }

})
const orderSchema = new mongoose.Schema({
    products:[orderedProductSchema],
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

export default Order