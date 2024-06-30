import {useForm} from 'react-hook-form'
import { PUBLIC_API } from '../utils';
import GoogleProviderWrapper from '../components/google-signin';
import { Link } from 'react-router-dom';

export default function Signup(){
    const {
        register,
        handleSubmit,
        getValues,
        formState:{errors,isSubmitting}
    } = useForm<SignupFormProps>()
    function onSubmit(data:SignupFormProps){
        console.log(data)
        PUBLIC_API.post('/auth/signup/?provider=email',{...data})
        .then(res=>{
        }).catch(err=>console.error(err))
    }   
    function sendVerificationCode(){
        const email = getValues().email
        PUBLIC_API(`/auth/verification-code/?email=${email}`)
        .then(res=>{})
        .catch(err=>console.error(err))
    }
    return(
        <div 
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-2 text-gray-800 items-center justify-center'>
            <div className='w-full flex items-center justify-between'>
                <h2 className='font-semibold'>Create your account</h2>
                <div className='text-xs text-gray-600'>
                    Already member? <Link className='text-blue-600' to='/signin' >Signin&nbsp;</Link>here.
                </div>
            </div>
            <form className='grid grid-cols-2 w-[800px] bg-white rounded'>
                <div className='flex-col text-gray-800 p-4 rounded text-sm flex gap-y-4 items-center justify-center'>
                    <div className='flex flex-col w-full gap-y-1'>
                        <label>Full name*</label>
                        <input
                        {...register('fullName',{
                            required:"Full name is required",
                            validate:(value)=>{
                                if(value.length < 3) {
                                    return "Full name must be length of 3"
                                }
                            }
                        })}
                        className='p-2 border focus:outline-none' placeholder='Enter your first and last name' />
                        {
                            errors.fullName && <p className='text-red-500 text-xs'>{errors.fullName.message}</p>
                        }
                    </div>
                    <div className='flex flex-col w-full gap-y-1'>
                        <label>Phone Number</label>
                        <input 
                        {...register('phoneNumber',{
                            required:false
                        })}
                        className='p-2 border focus:outline-none' placeholder='Please enter your phone number' />
                        {
                            errors.phoneNumber && <p className='text-red-500 text-xs'>{errors.phoneNumber.message}</p>
                        }
                    </div>
                    <div className='flex flex-col gap-y-1 w-full'>
                        <label>Email*</label>
                        <input 
                        {...register('email',{
                            required:"Email is required",
                            validate:(value)=>{
                                const result = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                               if(!result){
                                    return "Enter valid email."
                               }
                            }
                        })}
                        className='p-2 border focus:outline-none' placeholder='Please enter your email' />
                        {
                            errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>
                        }
                    </div>            
                    <div className='flex text-sm flex-col w-full gap-y-1 mb-2'>
                        <label>Password*</label>
                        <input
                        type='password'
                        {...register('password',{
                            required:"Password is required",
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
                        className='p-2 border focus:outline-none' 
                        placeholder='Minimum 8 characters with a number and a letter' />
                        {
                            errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>
                        }
                    </div>
                </div>
                <div className=' p-4 '>
                    <div className='flex mb-2 flex-col text-sm gap-y-1 w-full'>
                        <label>Verification code from Email*</label>
                        <div className='border rounded flex items-center'>
                            <input 
                            {...register('verificationCode',{
                                required:true
                            })}
                            className='p-2 w-full focus:outline-none' placeholder='Please enter your email' />
                            <button
                            disabled={!(getValues().email && !errors.email)} 
                            onClick={sendVerificationCode}
                            className='text-xs mx-1 text-gray-600'>send</button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-x-2 text-sm mb-2'>
                        <div className='flex gap-x-2 items-center'>
                            <input
                            {...register('isAgreedToTermsAndConditions',{
                                required:"Check this"
                            })}
                            type='checkbox' />
                            <label>I agreed to Terms and Conditions</label>
                        </div>
                        {errors.isAgreedToTermsAndConditions && <p className='text-xs text-red-500'>{errors.isAgreedToTermsAndConditions.message}</p>}
                    </div>
                    <button 
                    type='submit'
                    disabled={isSubmitting}
                    className='hover:bg-orange-700 bg-orange-600 mb-2 rounded text-sm p-2 text-white w-full' >
                        Sign up
                    </button>
                    <span className='text-sm text-gray-600'>
                        Or, signup with
                    </span>
                    <div className='flex mt-2 items-center gap-x-4'>
                        <GoogleProviderWrapper action='signup' />
                    </div>
                </div>
            </form>
        </div>
    )
}


