import { useState } from "react"
import { CiSearch } from "react-icons/ci";
export default function Searchbar(){
    const [searchKeyword,setSearchKeyword]  = useState('')
    function handleSearch(){
        // make call to the api 
    }
    function handleChange(ev:React.ChangeEvent<HTMLInputElement>){
        const value = ev.currentTarget.value
        setSearchKeyword(value)
    }
    return(
        <div className="w-full">
            <div className="bg-white px-2 py-1 flex items-center rounded border">
                <input className="focus:outline-none w-full text-sm" placeholder="Search here..." value={searchKeyword} onChange={handleChange} />
                <button onClick={handleSearch} ><CiSearch/></button>
            </div>
        </div>
    )
}