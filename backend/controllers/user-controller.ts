import { Request, Response } from "express";
import User from "../models/user";
import axios from 'axios'
import { compareHashWithText, generateHash, generateToken, tailorProducts, verifyVerificationCode } from "../utils";
import Redis from 'ioredis'
import mongoose from "mongoose";

const redis = new Redis()
async function getGoogleUserInfo(accessToken:string):Promise<{email:string,name:string,picture:string}|void>{
    return new Promise((resolve,reject)=>{
        axios(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,{
            headers:{
                Accept:'application/json',
                Authorization:`Bearer ${accessToken}`
            }
        }).then(res=>{
            resolve(res.data)
        })
        .catch(err=>reject(err))
    })
}

export async function createUser(req:Request,res:Response){
    try {
        const userInfo = req.body
        const existingUser = await User.findOne({email:userInfo.email})
        if(existingUser) {
            return res.status(409).json({success:true,message:'User already exists'})
        }
        const provider = req.query.provider as string
        let newUserInfo = {}
        if(provider==='email'){
            const isVerified = await verifyVerificationCode(userInfo.verificationCode,userInfo.email)
            if(!!isVerified){
                return res.status(400).json({
                    success:false,
                    message:'Invalid code'
                })
            }
            const hashedPassword = await generateHash(userInfo.password)
            userInfo.password = hashedPassword
            delete userInfo.isAgreedToTermsAndConditions
            delete userInfo.verificationCode
            newUserInfo = {...userInfo,password:hashedPassword}
        }else{
            const userData = await getGoogleUserInfo(req.body.token)
            console.log(userData,'userData')
            if(userData){
                const{name:fullName,email,picture:profilePic} = userData
                newUserInfo = {email,profilePic,fullName}
            }
        }
        const user = await new User({...newUserInfo}).save()
        // generate jwt token and send it to the user
        const token = generateToken({
            id:user.id,
            email:user.email
        })
        return res.status(200).json({
            success:true,
            message:'User created successfully',
            token
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Oops!, Error in server'
        })
    }
}

async function findUser(email:string){
    try {
        const user = await User.findOne({email})
        return user
    } catch (error) {
        console.log('Error checking user existence',error)
        throw error
    }
}
export async function signin(req:Request,res:Response){
    try {
        const {provider} = req.query
        let userDetail = {...req.body}
        if(provider==='google'){
            const userInfo = await getGoogleUserInfo(req.body.token)
            userDetail = {...userInfo}
        }
        const user = await findUser(userDetail.email)
        if(user){
            let isMatched = true
            if(provider === 'email'){
                isMatched = false
                isMatched = await compareHashWithText(user.password||"",userDetail.password)
            }
            if(isMatched){
                const token = generateToken({
                    id:user.id,
                    email:user.email
                })
                return res.status(200).json({
                    success:true,
                    message:'Signin succeed',
                    token
                })
            }else {
                return res.status(401).json({
                    success:false,
                    message:'Invalid password'
                })
            }
        }else{
            return res.status(404).json({
                success:true,
                message:'User not found'
            })
        }


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Oops!, Error in server'
        })
    }
}

export async function getUser(req:AppType.Request,res:Response){
    try {
        const userId = req.user?.id
        const user = await User.findById(userId)
        console.log(user)
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.error('Error updating billing address',error)
        return res.status(500).json({
            success:false,
            message:'Oops!, Error in server'
        })
    }
}

export function updateUser(req:Request,res:Response){
    try {
        
    } catch (error) {
        console.error('Error updating billing address',error)
        return res.status(500).json({
            success:false,
            message:'Oops!, Error in server'
        })
    }
}

export function deleteUser(req:Request,res:Response){
    try {
        
    } catch (error) {
        console.error('Error updating billing address',error)
        return res.status(500).json({
            success:false,
            message:'Oops!, Error in server'
        })
    }
}


export async function updateBillingAddress(req:AppType.Request,res:Response){
    try {
        const userId = req.user?.id
        const updateduser = await User.findByIdAndUpdate(userId,{
            $set:{
                billingAddress:{...req.body}
            }
        },{new:true})
        console.log(updateduser)
        // write to redis
        await redis.set(`billing-address:${userId}`,JSON.stringify(req.body))
        return res.status(201).json({
            success:true,
            message:'Billing address updated successfully'
        })
    } catch (error) {
        console.error('Error updating billing address',error)
        return res.status(500).json({
            success:false,
            message:'Oops!, Error in server'
        })
    }
}

export async function getCartItems(req:AppType.Request,res:Response){
    try {
        const userId = req.user?.id
        const user = await User.aggregate([
            {
              $match: {
                _id: new mongoose.Types.ObjectId(userId)
              }
            },
            {
              $lookup: {
                from: 'products',
                localField: 'cart.productId',
                foreignField: '_id',
                as: 'cartItems'
              }
            },
            {
              $addFields: {
                cartItems: {
                  $map: {
                    input: '$cartItems',
                    as: 'product', // represents each item of array
                    in: { // this is applied to each element of input array
                      id: { $toString: '$$product._id' },
                      name: '$$product.name',
                      productImg: '$$product.productImg',
                      price: '$$product.price',
                      discountPercentage: '$$product.discountPercentage',
                      stock: '$$product.stock',
                      rating: '$$product.rating',
                      quantity: {
                        $arrayElemAt: [ // returns element at the specified array index
                            // it accepts [array,index]
                          '$cart.quantity',
                          // searched an array for an occurence of a specified value and returns the index
                          // [array,search,start,end]
                          { $indexOfArray: ['$cart.productId', '$$product._id'] }
                        ]
                      }
                    }
                  }
                }
              }
            },
            {
              $project: {
                _id: 0, // Exclude the _id field if not needed
                cartItems: 1,
              }
            }
          ]);
        if(user){
            const cartItems = user[0].cartItems
        console.log(cartItems)
            const x = tailorProducts(cartItems)
            console.log(x)
            return res.status(200).json({
                success:true,
                items:cartItems
            })
        }
        else return res.status(404).json({
            success:false,
            message:'User not found'
        })
    } catch (error) {
        console.error('Error updating billing address',error)
        return res.status(500).json({
            success:false,
            message:'Oops!, Error in server'
        })   
    }
}

export async function addToCart(req:AppType.Request,res:Response){
    try {
        const userId = req.user?.id
        // only product id and quantity is required 
        // by default quantity is 1 
        const {productId} = req.body
        // first check if product is already in cart
        // also check for stock
        // if stock is less =0 , then deny the request
        const user = await User.findById(userId)
        if(user){
            const item = user.cart.findIndex(p=>p.productId.toString() === productId)
            if(item>=0){
                const prevQuantity = user.cart[item].quantity
                user.cart[item].quantity = prevQuantity + 1
                await user.save()  
            }else{
                await user.updateOne({
                    $push:{
                        'cart':{productId}
                    }
                })
            }
            return res.status(201).json({
                success:true,
                message:'Item added to cart'
            })
        }

        else {
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
        
        
    } catch (error) {
        console.error('Error updating billing address',error)
        return res.status(500).json({
            success:false,
            message:'Oops!, Error in server'
        })
    }
}

export async function getCartValue(req:AppType.Request,res:Response){
    try{
        const userId = req.user?.id
        const user = await User.findById(userId)
        if(user){
            // a -> previous value
            // b -> current value
            let cartValue = 0
            user.cart.forEach((item)=>{
                cartValue += item.quantity
            })
            return res.status(200).json({
                success:true,
                cartValue
            })
        }
        else return res.status(404).json({
            success:false,
            message:'User not found'
        })
    }
    catch(error){
        console.error('Error updating billing address',error)
        return res.status(500).json({
            success:false,
            message:'Oops!, Error in server'
        })
    }
}