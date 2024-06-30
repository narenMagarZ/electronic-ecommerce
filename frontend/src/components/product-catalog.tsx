import { PUBLIC_API } from "../utils";
import ProductCard from "./product-card";
import { useQuery } from "@tanstack/react-query";




export default function ProductCatalog(props:{category:string}){
    console.log(props.category)
    const {error,data,isLoading} = useQuery<ProductProps[]>({
        queryKey:[props.category],
        queryFn:async()=>{
            return PUBLIC_API(`/product/?q=${props.category}`)
            .then(res=>{
                if(res.status === 200 && res.data.success){
                    return res.data.products
                }
            }).catch(error=>console.error(error))
        }
    })
    if(isLoading) {
        return(
            <div>loading....</div>
        )
    }
    if(error){
        return(<div>error</div>)
    }
    return(
        <section className="grid grid-cols-4 gap-4">
            {
                data?.map((product,i)=>(
                    <ProductCard key={i} {...product} />
                ))
            }
        </section>
    )
}