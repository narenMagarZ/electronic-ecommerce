import { Link } from "react-router-dom";
import Searchbar from "./search-bar"
import { MdKeyboardArrowDown } from "react-icons/md";



export default function Navbar(){
    return(
        <div className="flex items-center gap-x-2 p-2">
            <Catagories/>
            <Searchbar/>
        </div>
    )
}

function Catagories(){
    const CATEGORORIES = [
    {id:1,title:'Laptop'},
    {id:2,title:'Phone'},
    {id:3,title:'Ear bud'},
    {id:4,title:'Monitor'},
    {id:5,title:'PC'},
    {id:6,title:'Charger'},
    {id:7,title:'Mouse'},
    {id:8,title:'Keyboard'},
    {id:9,title:'Tablet'},
    {id:10,title:'TV'}
]
    return(
        <div className=" group relative px-2 ">
            <button className="group flex items-center gap-x-2">
                Categories 
                <span className="group-hover:rotate-180 transition-transform">
                    <MdKeyboardArrowDown/>
                </span>
            </button>
            <div className="group-hover:block hidden absolute w-full right-0">
                <ul className="flex flex-col text-sm border bg-white z-50">
                    {
                        CATEGORORIES.map(({id,title})=>(
                            <li className=" hover:bg-gray-200 p-1 hover:text-orange-600" key={id} >
                                <Link className="" to={`/catalog/?q=${title}`}>{title}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

function Profile(){

}