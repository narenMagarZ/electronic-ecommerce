import { Link } from "react-router-dom";
import GoogleProviderWrapper from "../components/google-signin";
import {useForm} from 'react-hook-form'
import { PUBLIC_API } from "../utils";
import { useNavigate } from "react-router-dom";


export default function Signin(){
    const navigate = useNavigate()
    const {
        register,
        formState:{errors},
        handleSubmit
    } = useForm<SignInFormProps>()

    function onFormSubmit(data:SignInFormProps){
        PUBLIC_API.post(`/auth/signin/?provider=email`,{...data})
        .then(res=>{
            if(res.status===200 && res.data.success){
                navigate('/',{replace:true})
            }
            // else throw error using toastify
        })
        .catch(err=>console.error(err))

    }
    return(
        <section className="w-full max-w-[800px]">
            <div>
                <div className="flex justify-between items-center">
                    <h2 className="text-gray-800 font-semibold">Welcome to Electronic Ecommerce! Please Signin.</h2>
                    <div className="text-xs text-gray-600">
                        New member?<Link to={'/signup'} className="text-blue-700" > Signup</Link> here.
                    </div>
                </div>
                <form 
                onSubmit={handleSubmit(onFormSubmit)}
                className="bg-white mt-2 p-4 text-sm items-center flex gap-2 w-full">
                    <div className="flex flex-col gap-y-4 w-full">
                        <div className="flex flex-col text-gray-800">
                            <label>Email*</label>
                            <input
                            {...register('email',{
                                required:'Email is required',
                                validate:(value)=>{
                                    const result = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                                   if(!result){
                                        return "Enter valid email."
                                   }
                                }
                            })}
                            className="border p-2 focus:outline-none" placeholder='Please enter your email' />
                            {errors.email && <p className="text-xs text-red-500" >{errors.email.message}</p>}
                        </div>
                        <div className="flex flex-col text-gray-800">
                            <label>Password*</label>
                            <input 
                            {...register('password',{
                                required:'Password is required',
                                minLength:{
                                    value:8,
                                    message:'Password must have 8 characters'
                                },
                                validate:(value)=>{
                                    const result = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
                                    if(!result){
                                        return "Password must have one upper case letter, digit and special symbol"
                                    }
                                }
                            })}
                            className="border p-2 focus:outline-none" placeholder='Please enter your password' />
                            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                        </div>
                        <div className="text-xs text-blue-600">
                            <Link to={'/forget-password'} >Reset your password</Link> 
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full" >
                        <button type="submit" className="bg-orange-600 w-full p-2 rounded text-white">
                            Login
                        </button>
                        <span className="text-gray-600 text-xs ">Or, Login with</span>
                        <GoogleProviderWrapper action="signin" />
                    </div>
                </form>
            </div>
        </section>
    )
}

