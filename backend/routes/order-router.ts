import express from 'express'
import { cancelOrder, getOrder, getOrders, placeOrder } from '../controllers/order-controller'
import auth from '../middlewares/auth'


const orderRouter = express.Router()

// all these routes are protected
orderRouter.use(auth)
orderRouter.get('/confirm',getOrder)
orderRouter.get('/',getOrders)
orderRouter.post('/',placeOrder)
orderRouter.post('/cancelorder',cancelOrder)


export default orderRouter