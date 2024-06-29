
import nodeMailer from 'nodemailer'
import {google} from 'googleapis'
import dotenv from 'dotenv'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import crypto from 'crypto'
import Redis from 'ioredis'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import fs from 'fs/promises'
import handlebars from 'handlebars'
dotenv.config()

const redis = new Redis()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const CLIENT_ID = process.env.OAUTH_CLIENT_ID
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET
const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI
const REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

const transportOptions : SMTPTransport.Options = {
    service:'gmail',
    auth:{
        type:'OAuth2',
        user:'teksojr98@gmail.com',
        clientId:CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        refreshToken:REFRESH_TOKEN,
    }
}

const TRANSPORT = nodeMailer.createTransport(transportOptions)

function generateCode(){
    const otp = crypto.randomInt(100000,1000000)
    return otp
}
export async function sendVerificationCode(target:string){
    try {
        const code = generateCode()
        // save this code to somewhere, redis 
        // use email as key to store the verification code
        // for security concern use, timestamp
        // overwrite the code if user asked for resend the code
        // set the timeout of code, after which code automatically deletes from redis
        let mailOptions = {
            from :'teksojr98@gmail.com',
            to:target,
            subject:'Your verification code',
            html:`<b>${code}</b>`
        }
        const info = await TRANSPORT.sendMail(mailOptions)
        // set code only if transporter successfully send mail
        await redis.set(target,code) // here target = email
        await redis.expire(target,60) // it takes seconds, expire time is 60 sec
        console.log(info)

    } catch (error) {
        console.error("Error sending verification code",error)
    }

}

export async function sendOrderConfirmationMail(props:{
    email:string,
    productName:string,
    customerName:string,
    price:number,
    productImg:string,
    orderId:string
}){
    try{
        const f = await fs.readFile('./order-confirm-mail-format.html')
        let mailOptions = {
            from:'tekosjr98@gmail.com',
            to:props.email,
            subject:'Order Confirmation - Thank You for Your Purchase!',
            html:f.toString('ascii')
        }
        const info = await TRANSPORT.sendMail(mailOptions)
        console.log('Info about mail',info)
    }
    catch(error){
        console.error('Error sending order confirmation mail',error)
    }
}

export async function verifyVerificationCode(code:string,key:string){
    const rCode = await redis.get(key)
    if(rCode === code){
        // once verified, remove key
        await redis.del(key)
        return true
    }
    return false
}

export function verifyToken(token:string){
    const payload = jwt.verify(token,JWT_SECRET_KEY||"")
    return payload

}
export function generateToken(payload:any){
    const token = jwt.sign(payload,JWT_SECRET_KEY||'',{expiresIn:'24h'})
    return token
}

export async function generateHash(text:string){
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(text,salt)
    return hash
}

export async function compareHashWithText(hash:string,text:string){
    const isMatched = await bcrypt.compare(text,hash)
    return isMatched

}

export async function generateOrderId(){
    const uuid = crypto.randomUUID()
    const orderId = uuid.split('-').join('')
    return orderId
}



export async function generateOrderLinkId(product:any){
    // take orderid , userid , time 
    //  encrypt it 
    // later this encrypted id or link is decrypted to 
    // extract the orderid , userid and time
    // if time expires, order link is invalid
    const uuid = crypto.randomUUID()
    const orderLinkId = uuid.split('-').join('')
    await redis.hset("orderlink",orderLinkId,JSON.stringify(product))
    const fieldKey = `orderlink:${orderLinkId}`
    await redis.set(fieldKey,1,'EX',4*60)
    return orderLinkId
}



// (async()=>{
//     const data = {
//         customerName:'naren magar',
//         orderId:'23232323',

//     }
//     const src = await fs.readFile('./order-confirm-mail-format.html','utf-8')
//     const template = handlebars.compile(src)
//     const html = template(data)
//     console.log(html)
// })()