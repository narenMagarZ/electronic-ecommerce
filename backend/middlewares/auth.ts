import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const SECRET_KEY = process.env.JWT_SECRET_KEY
function verifyJwt(token:string){
    const payload = jwt.verify(token,''||"")
    return payload
}
function generateJwt(payload:{}){
    const token  = jwt.sign(payload,SECRET_KEY||'',{
        expiresIn:'24h'
    })
    return token
}

function auth(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split('Bearer ')[1]
        if(token){
            const payload = verifyJwt(token)
            if(typeof(payload) === 'object'){
                // req.user
                next()
            }else{
                return res.status(401).json({})
            }

        }else {
            return res.status(401).json({})
        }

    }else{
        return res.status(401).json({})
    }
}

export default auth