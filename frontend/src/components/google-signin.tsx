import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google"
import { FaGoogle } from "react-icons/fa";
import { PUBLIC_API } from "../utils";
import { useNavigate } from "react-router-dom";


type googleAction = {action :'signup' | 'signin'}

function GoogleBtn({action}:googleAction){
    const navigate = useNavigate()
    const handleSignup = useGoogleLogin({
        onError:(error)=>{console.error(error)},
        onSuccess:(tokenResponse)=>{
            console.log(tokenResponse)
            // now this access_token to api to authenticate
            PUBLIC_API.post(`/auth/${action}/?provider=google`,{token:tokenResponse.access_token})
            .then(res=>{
                navigate('/',{replace:true})
            })
            .catch(err=>console.error(err))
        }
    })
    return(
        <button 
        type='button'
        onClick={()=>{handleSignup()}}
        className='hover:bg-red-700 gap-x-2 rounded text-sm bg-red-600 w-full flex items-center justify-center text-white p-2'>
            <FaGoogle/>
            Google</button>
    )
}

export default function GoogleProviderWrapper({action}:googleAction){
    return(
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID||""}  >
            <GoogleBtn action={action} />
        </GoogleOAuthProvider>
    )
}