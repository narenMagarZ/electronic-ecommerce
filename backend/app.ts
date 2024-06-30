import express from 'express'
import cors from 'cors'
import productRouter from './routes/product-router'
import authRouter from './routes/auth-router'
import orderRouter from './routes/order-router'
import userRouter from './routes/user-router'

const app = express()
app.use(cors({
    origin:'http://localhost:3000'
}))


app.use(express.static('public/products'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/order',orderRouter)
app.use('/api/product',productRouter)
export default app