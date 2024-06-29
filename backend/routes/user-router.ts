import express from 'express'
import { addToCart, updateBillingAddress } from '../controllers/user-controller'
import z from 'zod'
import auth from '../middlewares/auth'
const userRouter = express.Router()


userRouter.use(auth)
userRouter.post('/billing-address',(req,res,next)=>{
    try{
        z.object({
            fullName:z.string().min(1),
            phoneNumber:z.string().min(10),
            province:z.string().min(1),
            city:z.string().min(1),
            area:z.string().min(1),
            address:z.string().min(1)
        }).parse(req.body)
        next()
    } catch(error:any){
        console.error('Error validating billing address schema',error)
        return res.status(400).json({
            success:true,
            message:'Validation error',
            error:error.errors[0].message
        })

    }
},updateBillingAddress)


userRouter.post('/cart',(req,res,next)=>{
    // validate product 
},addToCart)

userRouter.put('/cart',(req,res,next)=>{
    // 
})

export default userRouter