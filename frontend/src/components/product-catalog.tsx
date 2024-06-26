



// it contains the products catalog 

import ProductCard from "./product-card";

// we need product lists 
export default function ProductCatalog(props:{products:ProductCardProps[]}){
    console.log(props)
    
    return(
        <section className="grid grid-cols-4 gap-4">
            {
                props.products.map((product,i)=>(
                    <ProductCard key={i} {...product}  />
                ))
            }
        </section>
    )
}