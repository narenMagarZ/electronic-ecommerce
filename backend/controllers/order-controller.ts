import { Request, Response, NextFunction } from "express";
import Order from "../models/order";
import Redis from 'ioredis'
import User from "../models/user";
import { generateOrderId, sendOrderConfirmationMail } from "../utils";

const redis = new Redis()
export async function getOrder(req:AppType.Request,res:Response){
    try {
        const userId = req.user?.id
        const id = req.query.id as string
        const result = await redis.get(`orderlink:${id}`)
        if(!result){
            await redis.hdel('orderlink',id)
            return res.status(401).json({
                success:false,
                message:'Order confirm expires'
            })
        }
        const product = await redis.hget('orderlink',id)
        console.log(product,'product')
        if(product){
            const products = [JSON.parse(product)]
            // for billing address  
            // first check in redis
            // if not fetch from db
            // write to redis
            // return billing address too
            const result = await redis.get(`billing-address:${userId}`)
            let billingAddress = {}
            if(result){
                billingAddress = JSON.parse(result)
            }
            else{
                const user = await User.findById(userId)
                if(user){    
                    billingAddress = user.billingAddress || {}
                    await redis.set(`billing-address:${userId}`,
                        JSON.stringify(billingAddress)
                    )
                }
            }
            return res.status(200).json({
                success:true,
                products,
                billingAddress,
            })
        }else {
            return res.status(200).json({
                success:true,
                products:[]
            })
        }
    } catch (error) {
        console.error('Error getting order',error)
        return res.status(500).json({
            success:false,
            message:'Oops!, Error in server'
        })
    }
}

export function getOrders(req:Request,res:Response,next:NextFunction){
    try {
        const userId = ""
    } catch (error) {
        
    }
}

export async function placeOrder(req:AppType.Request,res:Response,next:NextFunction){
    try {
        // user can place order from cart and direct link
        // for direct link, only one product at a time can be placed
        // this product is already stored in cached
        // so direct access from their 

        // we need order link id 
        if(req.user) {
            const {id:userId,email} = req.user


            const {id:orderLinkId} = req.body
            const result = await redis.get(`orderlink:${orderLinkId}`)
            if(result){
                const product = await redis.hget(`orderlink`,orderLinkId)
                if(product){
                    const {name,productImg,offerPrice,price,category,id:productId} = JSON.parse(product)
                    // then parse result 
                    // send email about order
                    // generate order id
                    const cost = offerPrice || price
                    // const order = await new Order({
                    //     userId,
                    //     products:[{
                    //         productId,
                    //         cost, 
                    //     }]
                    // }).save()
                    const orderId = await generateOrderId()

                    sendOrderConfirmationMail({
                        orderId,
                        email,
                        customerName:'',
                        productName:name,
                        price,
                        productImg,
                    })
                    // also send mail 
                    // sendOrderConfirmationMail()
                    // also remove this product from redis
                    return res.status(200).json({success:true})
                } else {
                    return res.status(200).json(
                        {
                            success:false,
                            message:'Failed to place order'
                        })}
            } else {
                return res.status(200).json({
                    success:false,
                    message:'Failed to place order'
                })
            }
        }
    } catch (error) {
        
    }
}

export function cancelOrder(req:Request,res:Response,next:NextFunction){
    try {
        
    } catch (error) {
        
    }
}
