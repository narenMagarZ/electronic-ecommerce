import React from 'react';
import Navbar from './components/nav-bar';
import ProductCatalog from './components/product-catalog';

function Home() {
  const PRODUCTS : ProductCardProps[] = [
    {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'',discountPercentage:10,rating:4.4,sold:20,ratedCount:18},
    {id:'',title:"Macbook 14inch, 8gb ram",price:120000,url:'',img:'',discountPercentage:10,rating:4.4,sold:20,ratedCount:18}
  ]
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar/>
      <ProductCatalog products = {PRODUCTS} />
    </div>
  );
}


export default Home;
