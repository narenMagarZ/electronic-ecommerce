import {getProduct,getProducts, searchProduct, suggestProducts} from '../controllers/product-controller'
import express from 'express'


const productRouter = express.Router()

productRouter.get('/suggestion',suggestProducts)
productRouter.get('/search/',searchProduct)
productRouter.get('/:productSlug',getProduct)
productRouter.get('/',getProducts)

export default productRouter