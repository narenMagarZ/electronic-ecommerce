import {
    useState
} from "react"
import {
    PUBLIC_API
} from "../utils"


export default function useSearch() {
    const [searchKeyword, setSearchKeyword] = useState('')
    const [skip, setSkip] = useState(0)
    const [searchProducts, setSearchProducts] = useState < {
        id: string,
        name: string,
        productImg: string
        url:string
    } [] > ([])

    function handleChange(ev: React.ChangeEvent < HTMLInputElement > ) {
        const value = ev.currentTarget.value
        setSearchKeyword(value)
        PUBLIC_API(`/product/search/?q=${value}&skip=${0}`)
            .then(res => {
                if (res.status === 200 && res.data.success) {
                    setSearchProducts(res.data.products)
                }
            }).catch(err => console.error(err))
    }

    function handleScroll(ev: React.UIEvent < HTMLDivElement > ) {
        const scrolled = ev.currentTarget.scrollTop
        const scrollHeight = ev.currentTarget.scrollHeight
        if ((scrollHeight - scrolled - 250) <= 0) {
            setSkip(prev => prev + 5)
            PUBLIC_API(`/product/search/?q=${searchKeyword}&skip=${skip+5}`)
                .then(res => {
                    if (res.status === 200 && res.data.success) {
                        setSearchProducts(prev => [...prev, ...res.data.products])
                    }
                }).catch(err => console.error(err))
        }
    }
    function reset(){
        setSearchKeyword('')
        setSearchProducts([])
    }
    return {
        searchKeyword,
        searchProducts,
        reset,
        handleChange,
        handleScroll
    }
}