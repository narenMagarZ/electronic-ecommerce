import app from "./app";
import mongoose from 'mongoose'
const PORT = 5000

mongoose.connect('mongodb://localhost:27017/ecommerce')
.then(()=>{
    console.log('database connected')
})
.catch(err=>{
    console.error(err)
})

app.listen(PORT,()=>console.log("server is running on port",PORT))


