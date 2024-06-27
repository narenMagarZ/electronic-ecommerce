import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import slugify from "slugify";



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

// return product based on product-slug
export function getProduct(req:Request,res:Response,next:NextFunction){
    try{
        const {productSlug} = req.params

    }
    catch(error){

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
            const newProducts = products.map((product)=>{
                const discountPercentage = product.discountPercentage
                const offerPrice = discountPercentage > 0 ? product.price - Math.floor((discountPercentage * product.price) / 100) : undefined
                delete product.discountPercentage
                return {...product,offerPrice,url:createProductSlug(`${product.name} ${product.id}`)}
            })
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



const createProductSlug=(a:string)=>slugify(a,{replacement:'_',lower:true})
