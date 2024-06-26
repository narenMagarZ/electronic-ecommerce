import { useParams } from "react-router-dom"


export default function Product(){
    const param = useParams()
    if(param.productId === undefined){
        return <>No product mentioned</>
    }
    return(
        <div>

        </div>
    )
}