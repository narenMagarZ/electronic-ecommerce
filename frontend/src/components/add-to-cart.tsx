import {useDispatch} from 'react-redux'
import { addToCart, addToCartAsync } from '../features/cartslice'
import { AppDispatch } from '../store'
export default function AddToCart(props:{productId:string}){
    const cartDispatcher = useDispatch<AppDispatch>()
    function handleClick(ev:React.MouseEvent<HTMLButtonElement>){
        ev.preventDefault()
        // cartDispatcher(addToCart())
        cartDispatcher(addToCartAsync(props.productId))
        
    }
    return(
        <div className="text-center p-2">
            <button onClick={handleClick} className="px-2 text-sm text-white py-1 rounded bg-orange-500 hover:bg-orange-600 " >Add to cart</button>
        </div>
    )
}