import { PropsWithChildren } from "react";



// ComponentType
// ReactNode
export default function Modal({children}:{children:React.ReactNode}){
    return(
        <div className="absolute bg-[#353535b9] flex items-center inset-0 justify-center">
            {children}
        </div>
    )
}