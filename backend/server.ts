import app from "./app";
import mongoose from 'mongoose'
import Product from "./models/product";
import fs from 'fs'
const PORT = 5000

mongoose.connect('mongodb://localhost:27017/ecommerce')
.then(()=>{
    console.log('database connected')
})
.catch(err=>{
    console.error(err)
})

app.listen(PORT,()=>console.log("server is running on port",PORT))


fs.readFile('./products.json',(err,data)=>{
    if(err) throw err
    const products = JSON.parse(data.toString())
    // console.log(products)
    // Product.insertMany(products)
    // .then(res=>{
    //     console.log('insert done!')
    // }).catch(err=>{
    //     console.error(err)
    // })
})


