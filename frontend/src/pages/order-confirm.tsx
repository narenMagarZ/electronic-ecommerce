import { SetStateAction, createContext, useContext, useEffect, useState } from "react"
import Modal from "../components/modal"
import { useQuery } from "@tanstack/react-query"
import { PRIVATE_API } from "../utils"
import { useParams } from "react-router-dom"
import { useForm} from 'react-hook-form'
import PlaceOrder from "../components/place-order"

const ModalContext = createContext<{
    isModalOpen:boolean
    openModal:()=>void
    closeModal:()=>void
}>({isModalOpen:false,openModal:()=>{},closeModal:()=>{}})

interface ProductProps {
        id:string
        name:string
        productImg:string
        quantity:string
        price:number
        offerPrice?:number
        discountPercentage?:number
}
interface BillingAddressProps {
    fullName?:string
    province?:string
    phoneNumber?:string
    city?:string
    area?:string
    address?:string
}


interface OrderConfirmProps {
    products:ProductProps[]
    billingAddress:BillingAddressProps & {_id:string}
    email:string
}

export default function OrderConfirm(){
    const param = useParams()
    const {error,data,isLoading} = useQuery<OrderConfirmProps>({
        queryKey:['order-confirm'],
        queryFn:async()=>{
            return PRIVATE_API(`/order/confirm/?id=${param.id}`)
            .then(res=>{
                if(res.status === 200 && res.data.success){
                    return res.data
                }
            })
            .catch(error=>console.error(error))
        }
    })
    const [isModalOpen,setIsModalOpen] = useState(false)

    function openModal(){
        setIsModalOpen(true)
    }
    function closeModal(){
        setIsModalOpen(false)
    }
    useEffect(()=>{
        function handleDocClick(ev:MouseEvent){
            if(isModalOpen){
                const target = ev.target as HTMLElement
                if(!(target.closest('#billing-address-container') || target.closest('#edit-btn')) ){
                    closeModal()
                }
            }
            
        }   
        document.addEventListener('click',handleDocClick)
        return()=>{
            document.removeEventListener('click',handleDocClick)
        }
    },[isModalOpen])
    if(error){
        return <div>Error</div>
    }
    if(isLoading){
        return <div>loading...</div>
    }
    return(
        <ModalContext.Provider value={{isModalOpen,openModal,closeModal}} >
            <div className="w-full flex-col max-w-[800px] flex gap-2">
                <ShippingAddress {...data?.billingAddress} email={data?.email} />
                <OrderedProduct id={param.id} products={data?.products}  />
                {
                    isModalOpen && 
                    <Modal>
                        <BillingAddress {...data?.billingAddress} />
                    </Modal>
                }
            </div> 
        </ModalContext.Provider>
    )
}

function ShippingAddress(props:BillingAddressProps & {email?:string}){
    const {openModal} = useContext(ModalContext)
    return(
        <div className="bg-white rounded text-sm text-gray-800">
            <div className="p-4 flex flex-col gap-y-1">
                <p className="">Deliver to: <span className="">{props.fullName}</span></p>
                <p>Phone number: <span>{props.phoneNumber}</span></p>
                <div className="flex gap-x-2 items-center">Address: <span>{`${props.address}, ${props.area}, ${props.city}`}</span>
                <button 
                id="edit-btn"
                onClick={openModal}
                className="bg-gray-200 text-xs hover:bg-gray-300 rounded px-2 py-1">Edit</button>
                </div>
            </div>
        </div>
    )
}

function OrderedProduct({products,id}:{products?:ProductProps[],id?:string}){
    const [paymentMethod,setPaymentMethod] = useState('')
    const stock = 2
    return(
        <div className="bg-white rounded p-4 text-sm text-gray-800">
            <div className="flex flex-col gap-y-4">
                {
                    products?.map(({id,offerPrice,productImg,quantity,name,price,discountPercentage},i)=>(
                        <div key={i} className="flex flex-col gap-y-4">
                            <div className="flex items-center  justify-between gap-x-2">
                                <div className="flex items-center gap-x-2">
                                    <img className="h-[30px]" src={productImg} alt="" />
                                    <div className="flex flex-col gap-y-2" >
                                        <p className="">{name} </p>
                                        {
                                            stock < 5  && <span className="text-red-500">Only {stock} items(s) in stock</span>
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-5">
                                    <span>Qty: {quantity}</span>
                                    {
                                        offerPrice && offerPrice > 0 ? <div className="flex items-center gap-x-2">
                                            <span className="line-through text-xs">Rs. {price}</span>
                                            <span className="text-xs">-{discountPercentage}%</span>
                                            <span className="text-red-500">Rs.{offerPrice}</span>
                                        </div> :
                                        <div>
                                            <span className="text-red-500">Rs.{price}</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            {
                                (i+1) < products.length && 
                                <div className="border w-full">
                            </div>
                            }
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-between text-sm text-gray-800 mt-4">
                <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                <div className="flex items-end flex-col gap-y-2">
                    <div className="flex flex-col">
                        <span style={{width:'max-content'}} >Delivery fee: <span className="text-red-500">Rs 200</span></span>
                        <span>
                            Total Cost: <span className="text-red-500">Rs.{625}</span>
                        </span>
                    </div>
                    <PlaceOrder id={id} />
                </div>
            </div>
        </div>
    )
}




function PaymentMethod(props:{
    paymentMethod:string,
    setPaymentMethod:React.Dispatch<SetStateAction<string>>}){
    return(
        <div className="flex w-full flex-col gap-y-2">
            <h5 className="font-semibold">
                Payment method
            </h5>
            <div className="flex items-center mt-2 gap-x-2">
                <button
                onClick={()=>props.setPaymentMethod('cash-on-delivery')}
                className={`${props.paymentMethod === 'cash-on-delivery' ? 'bg-gray-300' :'bg-gray-200'}  hover:bg-gray-300 rounded p-1 px-2`}>Cash on Delivery</button>
                <button 
                onClick={()=>props.setPaymentMethod('khalti')}
                className={`${props.paymentMethod === 'khalti' ? 'bg-gray-300' : 'bg-gray-200' } hover:bg-gray-300 rounded p-1 px-2`}>Khalti</button>
            </div>
        </div>
    )
}


function BillingAddress(props:BillingAddressProps){
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm<BillingAddressProps>({
        defaultValues:{
            ...props
        }
    })
    function onFormSubmit(data:BillingAddressProps){
        PRIVATE_API.post('/user/billing-address',{...data})
        .then(res=>{})
        .catch(error=>console.error(error))
    }
    const modalContext = useContext(ModalContext)
    return(
        <div id="billing-address-container" className="bg-white rounded p-4 text-gray-800">
            <div>
                <h5 className="font-semibold ">Edit Address</h5>
                <div className="mt-2">
                    <form
                    onSubmit={handleSubmit(onFormSubmit)}
                    className="text-sm flex flex-col gap-y-4">  
                        <div className="flex items-center gap-x-4 justify-between">
                            <div className="flex flex-col gap-y-2">
                                <label>Full Name</label>
                                <input 
                                {...register('fullName',{
                                    required:'Full name is required'
                                })}
                                className="border p-2 rounded focus:outline-none" />
                                {errors.fullName && <p className="text-red-500" >{errors.fullName.message}</p>}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label>Phone Number</label>
                                <input 
                                {...register('phoneNumber',{
                                    required:'Phone number is required'
                                })}
                                className="border p-2 rounded focus:outline-none" />
                                {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4 justify-between">
                            <div className="flex flex-col gap-y-2">
                                <label>Province</label>
                                <input {...register('province',{
                                    required:'Province is required'
                                })} className="border p-2 rounded focus:outline-none" />
                                {errors.province && <p className="text-red-500">{errors.province.message}</p>}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label>City</label>
                                <input
                                {...register('city',{
                                    required:'City is required'
                                })}
                                 className="border p-2 rounded focus:outline-none" />
                                {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4 justify-between">
                            <div className="flex flex-col gap-y-2">
                                <label>Area</label>
                                <input 
                                {...register('area',{
                                    required:'Area is required',

                                })}
                                className="border p-2 rounded focus:outline-none" />
                                {errors.area && <p className="text-xs text-red-500">{errors.area.message}</p>}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <label>Address</label>
                                <input 
                                {...register('address',{
                                    required:'Address is required'
                                })}
                                className="border p-2 rounded focus:outline-none" />
                                {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                            </div>
                        </div>
                        <div className="justify-end gap-x-2 flex items-center">
                            <button
                            onClick={modalContext.closeModal}
                            type="button" className="bg-gray-200  px-2 py-1 hover:bg-gray-300 rounded">Discard</button>
                            <button type="submit" className="bg-orange-500 text-white hover:bg-orange-600 rounded px-2 py-1">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}