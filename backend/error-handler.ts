import { NextFunction, Request, Response, } from "express"


const notFound = (req:Request,res:Response,_:NextFunction)=>{
    return res.status(404).json({
        success:false,
        message:"Api url doesn't exist"
    })
}

