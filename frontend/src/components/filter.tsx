


export default function Filter(){
    return(
        <div>
            Sort By:
            <div>
                <button>
                    
                </button>
            <div className="rounded p-1 border flex flex-col">
                <button className="p-1 bg-gray-100 hover:bg-gray-200">Sales</button>
                <button className="p-1 bg-gray-100 hover:bg-gray-200">Rating</button>
                <button className="p-1 bg-gray-100 hover:bg-gray-200">Price low to hight</button>
                <button className="p-1 bg-gray-100 hover:bg-gray-200">Price high to low</button>
            </div>
            </div>
        </div>
    )
}