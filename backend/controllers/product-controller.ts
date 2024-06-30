import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import mongoose from "mongoose";
import { createProductSlug, generateOrderLinkId, tailorProducts } from "../utils";

export async function suggestProducts(req:Request,res:Response){
    try {

        const size = 12
        const products = await Product.aggregate([
            {
                $sample:{size:20}
            },
            {
                $project:{
                    _id:0,
                    id:{$toString:'$_id'},
                    name:1,
                    price:1,
                    discountPercentage:1,
                    stock:1,
                    productImg:1,
                    rating:1,
                    category:1,
                }
            }
        ])
        console.log(products)
        const newProducts = tailorProducts(products)

        return res.status(200).json({
            success:true,
            products:newProducts
        })

    } catch (error) {
        console.error('Error suggesting products',error)
        return res.status(500).json({
            success:false,
            message:'Oops!, Error in server'
        })
    }
}

export async function searchProduct(req:Request,res:Response){
    try {   
        let {q,skip} = req.query
        console.log(req.query)
        if(q && skip){
            q = q.toString()
            skip = skip.toString()
            const products = await Product.aggregate([
                {
                    $match:{
                        $or:[
                            {name:{$regex:q,$options:'i'}},
                            {category:{$regex:q,$options:'i'}}
                        ]
                    }
                },
                {
                    $project:{
                        _id:0,
                        id:{$toString:'$_id'},
                        name:1,
                        productImg:1,

                    }
                },
                {
                    $limit:parseInt(skip)+10
                },
                {
                    $skip:parseInt(skip)
                }
            ])
            console.log(products)
            const newProducts = products.map((product)=>{
                const url = createProductSlug(`${product.name} ${product.id}`)
                return {...product,url}
            })
            return res.status(200).json({
                success:true,
                products:newProducts
            })
        }else{
            return res.status(400).json({success:false})
        }
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({success:false,message:'Oops! Error in Server'})
    }
}

export function orderProduct(req:Request,res:Response,next:NextFunction){

}

function extractIdFromProductSlug(slug:string){
    const seg = slug.split('_')
    const productId = seg[seg.length-1]
    return productId
}

function productPriceAfterDiscount(acutalPrice:number,discount:number){
    return acutalPrice - discount
}
function calculateDiscount(discountPercentage:number,actualPrice:number){
    const discount = Math.floor((discountPercentage * actualPrice )/ 100)
    return discount
}
// return product based on product-slug
export async function getProduct(req:Request,res:Response,next:NextFunction){
    try{
        const {productSlug} = req.params
        const productId = extractIdFromProductSlug(productSlug)
        const product = await Product.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(productId)
                }
            },
            {
                $project:{
                    _id:0,
                    id:{$toString:'$_id'},
                    name:1,
                    price:1,
                    discountPercentage:1,
                    stock:1,
                    productImg:1,
                    rating:1,
                    category:1
                }
            },
        ])
        let newProduct = {}
        if(product.length === 1 ){
            const {price,discountPercentage,...p} = product[0]
            newProduct = discountPercentage > 0 ? {
                ...product[0],
                offerPrice: productPriceAfterDiscount(price,calculateDiscount(discountPercentage,price))
            } : {
                ...p,
                price
            }
        }
        console.log(newProduct)
        const orderLinkId = await generateOrderLinkId(newProduct)
        return res.status(200).json({
            success:true,
            product:{...newProduct,orderLinkId},
        })
    }
    catch(error){
        console.error('Error getting product',error)
        return res.status(500).json({
            success:false,
            message:'Oops!, Error in server'
        })
    }
}

// return products based on category
export async function getProducts(req:Request,res:Response,next:NextFunction){
    try{
        let {q,skip} = req.query
        if(q){
            q = q.toString()
            skip = skip?.toString() || "0"
            const products = await Product.aggregate([
                {
                    $match:{
                        category:q.toLowerCase().trim()
                    }
                },
                {
                    $project:{
                        _id:0,
                        id:{$toString:'$_id'},
                        name:1,
                        price:1,
                        discountPercentage:1,
                        stock:1,
                        productImg:1
                    }
                },
                {
                    $limit:20
                },
                {
                    $skip:parseInt(skip)
                }
            ])
            // calculate offer price, add product slug using product id
            const newProducts = tailorProducts(products)

            // const newProducts = products.map((product)=>{
            //     const discountPercentage = product.discountPercentage
            //     const offerPrice = discountPercentage > 0 ? product.price - Math.floor((discountPercentage * product.price) / 100) : undefined
            //     delete product.discountPercentage
            //     return {...product,offerPrice,url:createProductSlug(`${product.name} ${product.id}`)}
            // })
            return res.status(200).json({
                success:true,
                products:newProducts
            })
        }else{
            return res.status(400).json({status:true,products:[]})
        }   

    }
    catch(error){

    }
}


