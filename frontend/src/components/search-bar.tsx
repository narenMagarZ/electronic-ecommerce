import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import useSearch from "../hooks/search-hook";
import { useEffect } from "react";
export default function Searchbar() {
  const { searchKeyword, searchProducts, reset ,handleChange, handleScroll } =
    useSearch();
  function handleSearch() {
    // make call to the api
  }

  useEffect(()=>{

    function handleEscape(ev:KeyboardEvent){
        if(ev.code==='Escape'){
            reset()
        }
    }
    document.addEventListener('keydown',handleEscape)
    return()=>{
        document.removeEventListener('keydown',handleEscape)
    }
  },[])


  return (
    <div className="w-full relative">
      <div className="bg-white px-2 py-1 flex items-center rounded border">
        <input
          className="focus:outline-none w-full text-sm"
          placeholder="Search here..."
          value={searchKeyword}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>
          <CiSearch />
        </button>
      </div>
      <div
        onScroll={handleScroll}
        className="z-50 bg-white w-full absolute max-h-[250px] overflow-auto"
      >
        {searchProducts.map((product, i) => (
          <Link
            to={`/product/${product.url}`}
            className="flex hover:bg-gray-200 group p-2 items-center gap-x-2"
          >
            <img className="h-[30px]" src={product.productImg} alt="product" />
            <span className="text-sm group-hover:text-red-500">
              {product.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
