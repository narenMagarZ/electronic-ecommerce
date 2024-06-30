import axios from "axios";





export const PUBLIC_API = axios.create({
    baseURL:"http://localhost:5000/api"
})

export const PRIVATE_API = axios.create({
    baseURL:'http://localhost:5000/api/'
})

PUBLIC_API.interceptors.response.use((value)=>{
    const token = value.data.token
    if(token){
        window.localStorage.setItem('token',token)
    }
    return value
})

PRIVATE_API.interceptors.request.use((config)=>{
    if(config.headers){
        const token = window.localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

