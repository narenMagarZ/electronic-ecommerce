import { NextFunction, Response } from "express";
import { verifyToken } from "../utils";


function auth(req:AppType.Request,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split('Bearer ')[1]
        if(token){
            const payload = verifyToken(token)
            if(payload){
                req.user = payload as {email:string,name:string,id:string}
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