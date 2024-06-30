import { CATEGORIES } from "../constants"
import ProductCatalog from "./product-catalog"

export default function CategoryCatalog(){
    // const PRODUCTS : ProductCardProps[] = [
    //     {id:'',title:"Macbook 14inch, 8gb ram, 128gb ssd, silver gray color this is good to ",price:120000,url:'',img:'/products/tab1.jpg',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    //     {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'/products/tab4.jpg',discountPercentage:0,rating:4.4,sold:20,ratedCount:18},
    //     {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'/products/tv.jpg',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    //     {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'/products/ph4.jpg',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    //     {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'/products/ph5.jpg',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    //     {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'/products/k1.jpg',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    //     {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'/products/ipd2.jpg',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    //     {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'/products/ipd2.jpg',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    //     {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'/products/ipd2.jpg',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    //     {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'/products/ipd2.jpg',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    //     {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'/products/ipd2.jpg',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    //     {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'/products/ipd2.jpg',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    //     {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'/products/ipd2.jpg',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    //     {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'/products/ipd2.jpg',discountPercentage:10,rating:4.4,sold:20,ratedCount:18}
    //   ]
    return(
        <section className="flex flex-col gap-y-12">
            {
                CATEGORIES.map((category)=>(
                    <div key={category} id={`${category.toLowerCase()}`} >
                        <h4 className="font-semibold text-xl text-gray-800 mb-2">{category.toUpperCase()}</h4>
                        <ProductCatalog category={category} />
                    </div>
                ))
            }
        </section>
    )
}
