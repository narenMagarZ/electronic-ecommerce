import { useNavigate, useParams } from "react-router-dom"
import { useQuery, useQueries } from "@tanstack/react-query"
import { PUBLIC_API } from "../utils"
import AddToCart from "../components/add-to-cart"
import ProductCard from "../components/product-card"


interface ProductProps {
    id:string
    price:number
    discountPercentage:number
    rating:number
    stock:number
    category:string
    productImg:string
    name:string
    offerPrice:number
    orderLinkId:string
}

interface SuggestedProductProps {
    id:string
    price:number
    stock:number
    category:string
    name:string
    offerPrice?:number
    productImg:string
    url:string
    rating:number
}

export default function Product(){
    const navigate = useNavigate()
    const param = useParams()
    const [query1,query2] = useQueries({
        queries:[
            {
                queryKey:[param],
                queryFn:async():Promise<ProductProps>=>{
                    return PUBLIC_API(`/product/${param.productSlug}`)
                    .then(res=>{
                if(res.status === 200 && res.data.success){
                    return res.data.product
                }
            }).catch(error=>console.error(error))
                }
            },
            {
                queryKey:['suggested-product'],
                queryFn:async():Promise<SuggestedProductProps[]>=>{
                    return PUBLIC_API('/product/suggestion')
                    .then(res=>{
                        return res.data.products
                    }).catch(error=>console.error(error))
                }
            }
        ]
    })
    const {error:error1,isLoading:isLoading1,data:data1} = query1
    const {error:error2,isLoading:isLoading2,data:data2} = query2
    if(error1){
        return(
            <div>Error</div>
        )
    }
    if(isLoading1){
        return(
            <div>loading...</div>
        )
    }
    return(
        <section className="max-w-[600px]" >
            <div className="flex gap-x-12 gap-y-4 items-center">
                <div className="relative border group">
                    <img 
                    className="" src={data1?.productImg} alt="product" />
                    <div className="absolute">

                    </div>
                </div>
                <div>
                    <div>
                        <h2 className="text-2xl">{data1?.name}</h2>
                        <div>
                            
                            <button>
                                <span className="text-xs">{data1?.rating} Ratings</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        {
                            data1?.offerPrice ? 
                            (
                                <div className="flex flex-col">
                                    <span className="text-red-600">Rs.{data1.offerPrice}</span>
                                    <div className="flex text-gray-600 items-center gap-x-2"> 
                                        <span className="line-through">Rs.{data1.price}</span> 
                                        <span>-{data1.discountPercentage}</span>
                                    </div>                                        
                                </div>
                            ) : (
                                <div>
                                    <span className="text-red-600">Rs.{data1?.price}</span>
                                </div>
                            )
                        }
                        <div className="flex items-center gap-x-4">
                            <span className="text-sm text-gray-500">Quantity</span>
                            <div className="flex items-center gap-x-2">
                                <button className="bg-gray-300 hover:bg-gray-400 text-xs hover:text-white px-2 rounded p-1">Decr</button>
                                <span>{1}</span>
                                <button className="bg-gray-300 hover:bg-gray-400 hover:text-white px-2 rounded p-1 text-xs">Incr</button>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="flex w-full gap-x-2 items-center">
                        <button onClick={()=>{
                            // before navigate to the order confirm page
                            // generate a order-confirm-link 
                            navigate(`/order-confirm/${data1?.orderLinkId}`)
                        }} className="
                        px-2 py-1 rounded text-white text-sm bg-blue-600 hover:bg-blue-700
                        " >Buy Now
                        </button>
                        <AddToCart productId={data1?.id||""} />
                    </div>

                </div>
            </div>
            <div className="mt-10">
                <h5 className="font-semibold mb-2 text-gray-800">Suggestions</h5>
                <div className="grid grid-cols-4 gap-4">
                    {
                        data2?.map((product)=>(
                            <ProductCard {...product} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}