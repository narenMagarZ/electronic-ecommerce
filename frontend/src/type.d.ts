interface ProductProps {
    id:string
    name:string
    stock:number
    price:number
    offerPrice?:number
    productImg:string
    url:string
}



interface SignInFormProps {
    email:string
    password:string

}


type SignupFormProps = {
    fullName:string
    phoneNumber:number
    password:string
    email:string
    verificationCode:string
    isAgreedToTermsAndConditions:boolean
}
