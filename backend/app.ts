import express from 'express'
import cors from 'cors'
import productRouter from './routes/product-router'


const app = express()
app.use(cors({
    origin:'http://localhost:3000'
}))


app.use(express.static('public/products'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/product',productRouter)
export default app