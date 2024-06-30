import { Link } from "react-router-dom";
import Searchbar from "./search-bar"
import { MdKeyboardArrowDown } from "react-icons/md";
import Cart from "./cart";
import { IoMdPerson } from "react-icons/io";



export default function Navbar(){
    return(
        <header >
            <nav className="flex items-center gap-x-4 p-2">
                <Catagories/>
                <Searchbar/>
                <Cart/>
                <Link to={'/signin'} >
                <IoMdPerson/>
                </Link>
            </nav>
        </header>
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
            <div className="group-hover:block hidden absolute w-full z-50 right-0">
                <ul className="flex flex-col text-sm border bg-white">
                    {
                        CATEGORORIES.map(({id,title})=>(
                            <li className=" hover:bg-gray-200 p-1 hover:text-orange-600" key={id} >
                                <a className="" href={`/#${title.toLowerCase()}`}>{title}</a>
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