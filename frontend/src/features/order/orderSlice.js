import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const createOrder =createAsyncThunk('order/createOrder',async(order,{rejectWithValue})=>
{
    try{

   const config={
        headers:{
            'Content-Type':'application/json'
        }
                      }
             const {data}=await axios.post('/api/v1/new/create',order,config)    
             return data;    
    }
    catch(error){
       return  rejectWithValue(error.response?.data  || {message :'order creation failed'})
    }
   
})

export const getAllMyOrders =createAsyncThunk('order/getAllMyOrders',async(_,{rejectWithValue})=>
{
    try{
             const {data}=await axios.get('/api/v1/order/sample/check')    
             return data;    
           
    }
    catch(error){
       return  rejectWithValue(error.response?.data  || {message :'orders fetching failed'})
    }
   
})

//getting single order details
export const getSingleOrderDetails =createAsyncThunk('order/getSingleOrderDetails',async(orderID,{rejectWithValue})=>
{
    try{
             const {data}=await axios.get(`/api/v1/order/${orderID}`)    
             return data;    
           
    }
    catch(error){
       return  rejectWithValue(error.response?.data  || {message :'order fetching failed'})
    }
   
})



const orderSlice=createSlice({
       name:'order',

       initialState:{
        success:false,
        error:null,
        loading:false,
        orders:[],
        order:{} },
       reducers:{
        removeErrors:
        (state)=>{state.error=null}
        ,
        removeSuccess:
        (state)=>{state.success=false}
    },
     extraReducers:(builder)=>{

      // creating orders
        builder
          .addCase(createOrder.pending,(state)=>{
            state.loading=true,
            state.error=null
          })
          .addCase(createOrder.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.order=action.payload.order,
            state.success=action.payload.success
          })
          .addCase(createOrder.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload?.message  ||'failed to create order'

          })

  //getting all single user orders
             builder
          .addCase(getAllMyOrders.pending,(state)=>{
            state.loading=true,
            state.error=null
          })
          .addCase(getAllMyOrders.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.orders=action.payload.orders || [],
            state.success=action.payload.success
          })
          .addCase(getAllMyOrders.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload?.message  ||'orders fetching failed'

          })

        // getting single order details
        
        //getting all single user orders
             builder
          .addCase(getSingleOrderDetails.pending,(state)=>{
            state.loading=true,
            state.error=null
          })
          .addCase(getSingleOrderDetails.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.order=action.payload.order,
            state.success=action.payload.success
          })
          .addCase(getSingleOrderDetails.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload?.message  ||'order fetching failed'

          })

     }

})

export default orderSlice.reducer

export const {removeSuccess,removeErrors}=orderSlice.actions

   