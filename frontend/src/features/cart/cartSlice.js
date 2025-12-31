import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemsToCart=createAsyncThunk('cart/addItemsToCart',async({id,quantity},{rejectWithValue})=>{
try{
  const {data} = await axios.get(`/api/v1/product/${id}`)
  return{product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.images[0],
        stock:data.product.stock,
        quantity:quantity
  }
}
catch(error){
return    rejectWithValue(error.response?.data || {message:'An error occured'})

}
    
})

const cartSlice=createSlice(
    {
        name:'cart',
        initialState:{
            cartItems:JSON.parse(localStorage.getItem('cartItems')) || [],
            loading:false,
            error:null,
            removeItem:null,
            success:false,
            message:null,
            shippingInfo:{}
     },
        reducers:
        {
            removeErrors:(state)=>{
                state.error=null
            }, 
            removeSuccess:(state)=>{
                state.success=null
            },
           removeMessage:(state)=>{
                    state.message=null
                 },
            removeCartItem:(state,action)=>{
                const id=action.payload
                state.cartItems= state.cartItems.filter(item=>id!=item.product)
                localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
                state.removeItem=null
            },
            saveShippingInfo:(state,action)=>{
               state.shippingInfo=action.payload
               localStorage.setItem('shippingInfo',JSON.stringify(state.shippingInfo))
            },
            clearCart:(state)=>{
                state.cartItems=[]
                localStorage.removeItem('cartItems')
                localStorage.removeItem('shippingInfo')
            }
        }  ,
        extraReducers:(builder)=>{
            builder.addCase(addItemsToCart.pending,(state)=>{
                state.loading=true;
                state.error=null
            } )
            .addCase(addItemsToCart.fulfilled,(state,action)=>{
                const item=action.payload
            const isItemExist=state.cartItems.find(i=>i.product===item.product)
            if(isItemExist){
                isItemExist.quantity=item.quantity
                 state.message=`${item.name} updated quantity added to cart successfully`
            }
            else{
                       state.cartItems.push(item)
                       state.message=`${item.name} added to cart successfully`
            }
                state.loading=false;
                state.error=null
                state.success=true;
                
             localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
            })
            .addCase(addItemsToCart.rejected,(state,action)=>{
                state.error=action.payload?.message || 'an error occured' 
            })
        } 
    
    }
)
 export const{removeErrors,removeSuccess, removeCartItem,saveShippingInfo,clearCart,  removeMessage} =cartSlice.actions
 export default cartSlice.reducer