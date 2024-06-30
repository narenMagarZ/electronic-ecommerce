import { NextFunction, Request, Response} from "express";
import { sendVerificationCode } from "../utils";

export function getVerificationCode(req:Request,res:Response,next:NextFunction){
    try {
        const email = req.query.email as string
        sendVerificationCode(email)
        return res.status(200).json({
            success:true,
            message:'Verification code sent to your email, check it'
        })
        
    } catch (error) {
        console.error("Error sending verification code",error)
        return res.status(500).json({
            success:false,
            message:'Oops!, Error in server'
        })
    }
}

