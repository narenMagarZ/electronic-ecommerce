import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PRIVATE_API } from "../utils";


interface CartState{
    value:number
}

const initialState : CartState = {
    value:0
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addInitialCartValue:(state,action:PayloadAction<number>)=>{
            state.value = action.payload
        },
        addToCart:(state)=>{
            state.value += 1
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addToCartAsync.fulfilled,(state)=>{
            state.value += 1
        })
    }
})

export const addToCartAsync = createAsyncThunk('cart/addToCartAsync',
    async (productId:string)=>{
         return PRIVATE_API.post('/user/cart',{productId})
         .then(res=>{
             return 0
         })
         .catch(err=>{
            return 0
         })
    })

// this is gonna used while dispatching actions
export const {addToCart,addInitialCartValue} = cartSlice.actions

export default cartSlice.reducer

