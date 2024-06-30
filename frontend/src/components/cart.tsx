import { SetStateAction, useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useQuery } from "@tanstack/react-query";
import { PRIVATE_API } from "../utils";
import { addInitialCartValue } from "../features/cartslice";
import PlaceOrder from "./place-order";


interface CartItemProps {
    id:string
    name:string
    quantity:number
    productImg:string
    price:number
    offerPrice?:number
    discountPercentage?:number
    stock:number
}


// make a cart store 
export default function Cart(){


    const dispatch = useDispatch()
    const {data:initialCartValue} = useQuery({
        queryKey:[''],
        queryFn:async()=>{
            return PRIVATE_API('/user/cartvalue')
            .then(res=>{
                if(res.status===200 && res.data.success){
                    return res.data.cartValue
                }
            })
            .catch(error=>console.error(error))
        }
    })
    useEffect(()=>{
        dispatch(addInitialCartValue(initialCartValue))
    },[initialCartValue])
    const [isCartItemWrapperOpen,setIsCartItemWrapperOpen] = useState(false)
    const {data} = useQuery<CartItemProps[]>({
        queryKey:['cart-item'],
        enabled:isCartItemWrapperOpen,
        queryFn:async()=>{
            return PRIVATE_API('/user/cart')
            .then(res=>{
                if(res.status===200 && res.data.success){
                    return res.data.items
                }
            })
            .catch(err=>console.error(err))
        }
    })
    const cartValue = useSelector((state:RootState)=>state.cart.value)

    return(
        <div>
            <button 
            onClick={()=>setIsCartItemWrapperOpen(p=>!p)}
            className="relative"><FaCartPlus size={18} />
            <span className="absolute text-xs text-red-700 bottom-1 p-1 left-4 bg-white rounded-full">{cartValue}</span>
            </button>
            {
                isCartItemWrapperOpen && 
                <CartItemsWrapper
                items={data||[]}
                setIsCartItemWrapperOpen={setIsCartItemWrapperOpen} />
            }
        </div>
    )
}


function CartItemsWrapper(props:{
    setIsCartItemWrapperOpen:React.Dispatch<SetStateAction<boolean>>
    items:CartItemProps[]
}){


    function updateCart(){
        
    }
    return(
        <div className="absolute gap-y-2 text-gray-800 flex flex-col p-4 max-h-[800px] min-h-[400px] overflow-auto right-0 top-0 bg-white w-[450px]">
             <h5 className="font-semibold">Your Cart Items</h5>
             <button 
            onClick={()=>props.setIsCartItemWrapperOpen(false)}
            className="self-end hover:bg-gray-300 rounded-full p-1">
                <RxCross2 size={20}/>
            </button>
            <div className="flex flex-col gap-y-4">
                {
                    props.items.map((item,i)=>(
                        <div className="flex flex-col gap-y-6">
                            <div key={i} className="text-sm flex items-center justify-between">
                                <div className="flex items-center gap-x-2">
                                    <img className="h-[30px]" src={item.productImg} alt="" />
                                    <div className="flex flex-col">
                                        <span>{item.name}</span>
                                        <div className="flex items-center gap-x-4">
                                            <button 
                                            onClick={()=>{}}
                                            className="rounded  px-2 hover:bg-gray-300 bg-gray-200">-</button>
                                            <span>{item.quantity}</span>
                                            <button 
                                            onClick={()=>{}}
                                            className="rounded px-2 hover:bg-gray-300 bg-gray-200" >+</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <span className="text-gray-600 text-xs">
                                        Stock.<span>&nbsp;{item.stock}</span>
                                    </span>
                                    {
                                        item.offerPrice && item.offerPrice > 0 ? 
                                        <div>
                                            <span className="line-through text-gray-600">Rs.{item.price}</span>
                                            <span>-{item.discountPercentage}</span>
                                            <span className="text-red-500">Rs.{item.offerPrice}</span>
                                        </div> :
                                        <div className="text-red-500">
                                            Rs.{item.price}
                                        </div>
                                    }
                                </div>
                                
                            </div>
                            <div className="border ">
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="self-end">
                <div className="flex text-sm flex-col">
                    <span>
                    Delivery Fee:
                    <span className="text-red-500"> Rs.200</span>
                    </span>
                        <span>
                        Total Price:
                    <span className="text-red-500"> Rs.9000</span>
                        </span>
                </div>
            </div>
            <div className="self-end">
                <PlaceOrder id="" />
            </div>
        </div>
    )
}