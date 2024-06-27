import {getProduct,getProducts, searchProduct} from '../controllers/product-controller'
import express from 'express'


const productRouter = express.Router()

productRouter.get('/search/',searchProduct)
productRouter.get('/:productSlug',getProduct)
productRouter.get('/',getProducts)


export default productRouter