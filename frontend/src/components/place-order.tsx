import { PRIVATE_API } from "../utils"
export default function PlaceOrder(props:{id?:string}){
    function handlePlaceOrder(){
        PRIVATE_API.post('/order',{id:props.id})
        .then(res=>{})
        .catch(error=>console.error(error))
    }
    return(
    <div>
        <button 
        onClick={handlePlaceOrder}
        className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded">
            Place order</button>
    </div>
    )
}
