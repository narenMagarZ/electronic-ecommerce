import { Link } from "react-router-dom"
import AddToCart from "./add-to-cart"
export default function ProductCard(props:ProductProps){

    return(
        <div className="bg-white hover:shadow rounded p-1 max-h-[250px] max-w-[180px]">
            <Link to={`/product/${props.url}`} className="flex flex-col gap-y-2">
                <div className="flex items-center justify-center">
                    <img src={props.productImg} alt="product" className="h-[120px]" />
                </div>
                <div>
                    <p 
                    style={{textWrap:'nowrap'}}
                    className="text-sm overflow-hidden text-ellipsis text-gray-800 hover:text-red-700"><strong>{props.name}
                        </strong>
                    </p>
                    <div className="flex text-gray-800 items-center gap-x-2 text-sm">
                        {/* <span>{props.rating}/5 </span> */}
                        {/* <span>({props.sold}) sold</span> */}
                    </div>
                    <div className="text-sm text-gray-800">
                        <div className="">
                            { props.offerPrice ? 
                            <div className="flex items-center gap-x-2">
                                <span className="text-red-700">
                                    {props.offerPrice}
                                </span>
                            <span className="line-through">{props.price}</span>
                            </div>
                            : <span className="text-red-700">Rs.{props.price}</span>
                            }
                            </div>
                    </div>
                    <AddToCart  productId={props.id} />
                </div>
            </Link>
        </div>
    )
}