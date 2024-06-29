import express from 'express'
import { createUser, signin } from '../controllers/user-controller'
import { getVerificationCode } from '../controllers/auth-controller'
import z from 'zod'

const authRouter = express.Router()


authRouter.get('/verification-code',(req,res,next)=>{
    try{
        z.string()
        .email()
        .parse(req.query.email as string)
        next()
    }
    catch(error:any){
        return res.status(400).json({
            success:false,
            message:'Validation error',
            error:error.errors[0].message
        })
    }

},getVerificationCode)
authRouter.post('/signin',(req,res,next)=>{
    try{
        const provider = req.query.provider as 'email' | 'google'
        const schema = {
            email:{
                email:z.string().email(),
                password:z.string().min(8)
            },
            google:{
                token:z.string().min(1)
            }
        }
        z.object(schema[provider])
        .parse(req.body)
        next()
    }
    catch(error:any){
        return res.status(400).json({
            success:false,
            message:'Validation error',
            errors:error.errors[0].message
        })
    }
},signin)
authRouter.post('/signup',(req,res,next)=>{
    try{
        const provider = req.query.provider as "email" || "google"
        const schema = {
            email : {
                fullName:z.string().min(3),
                email:z.string().email(),
                password:z.string().min(8),
                verificationCode:z.string(),
                isAgreedToTermsAndConditions:z.literal(true),
                phoneNumber:z.string().optional()
            },
            google:{
                token:z.string().min(1)
            }
        }
        z.object(schema[provider])
        .parse(req.body)
        next()  
    } catch(error:any){
        return res.status(400).json({
            success:false,
            message:'Validation error',
            errors:error.errors[0].message
        })
    }


},createUser)

export default authRouter