

export default function ProductCard(props:ProductCardProps){
    return(
        <div className="border p-1">
            <div className="">
                <img src={props.img} alt="product" className="" />
                <div>
                    <span><strong>{props.title}
                        </strong></span>
                    <div className="flex items-center gap-x-2">
                        <span>{props.rating}/5 {props.ratedCount}</span>
                        <span>{props.sold} sold</span>
                    </div>
                    <div>
                        <span>
                            <strong>RS. {props.price}</strong>
                        </span>
                        {
                            props.discountPercentage && <span className="text-cross">
                                Rs. {props.price}
                            </span>
                        }
                        <span>{}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}