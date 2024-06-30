import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
export default function Catalog(){
    const [searchParam] = useSearchParams()
    useEffect(()=>{
        if(searchParam.get('q')){
            console.log(searchParam)
        }else{

        }
    },[searchParam])
    // fetch the products based on category
    return(
        <div>
            
        </div>
    )
}