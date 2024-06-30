type ExpressRequest = import('express').Request


declare namespace AppType {
    type Request = {
        user?:{id:string,name:string,email:string}
    } & ExpressRequest
}