import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Admin fetching product
export const  fetchAdminProducts =createAsyncThunk('admin/fetchAdminProducts',
    async(__,{rejectWithValue})=>{
        try{
        const {data}=await axios.get('/api/v1/admin/products')
        return data
        }
        catch(error){
  return     rejectWithValue(error.response?.data?.message || 'product fetching failed')
        }
    })
 
//create product
export const  createProduct =createAsyncThunk('admin/createProduct',
    async(productData,{rejectWithValue})=>{
        try{
            const config={
                headers:{
                'Content-Type':'multipart/form-data'
            }}
        const {data}=await axios.post('/api/v1/admin/products/create',productData,config)
        return data
        }
        catch(error){
  return     rejectWithValue(error.response?.data?.message || 'product fetching failed')
        }
    })

 // Update Product

 export const  updateProduct =createAsyncThunk('admin/updateProduct',
    async({id,FormData},{rejectWithValue})=>{
        try{
            const config={
                headers:{
                'Content-Type':'multipart/form-data'
            }}
        const {data}=await axios.put(`/api/v1/admin/product/${id}`,FormData,config)
        return data
        }
        catch(error){
  return     rejectWithValue(error.response?.data?.message || 'product fetching failed')
        }
    })

     export const  deleteProduct =createAsyncThunk('admin/deleteProduct',
    async(id,{rejectWithValue})=>{
        try{
         
        const {data}=await axios.delete(`/api/v1/admin/product/${id}`)
        return data
        }
        catch(error){
  return     rejectWithValue(error.response?.data?.message || 'product deletion failed')
        }
    })

    // fetch all users
     export const  fetchAllUsers =createAsyncThunk('admin/fetchAllUsers',
    async(_,{rejectWithValue})=>{
        try{
         
        const {data}=await axios.get(`/api/v1/admin/users`)
        return data
        }
        catch(error){
  return     rejectWithValue(error.response?.data?.message || 'user feching failed')
        }
    })

    // delete user
         export const  deleteUser =createAsyncThunk('admin/deleteUser',
    async(id,{rejectWithValue})=>{
        try{
         
        const {data}=await axios.delete(`/api/v1/admin/user/${id}`)
        return data
        }
        catch(error){
  return     rejectWithValue(error.response?.data?.message || 'user feching failed')
        }
    })
 // admin fetch single user
          export const  getSingleUser =createAsyncThunk('admin/getSingleUser',
    async(id,{rejectWithValue})=>{
        try{
         
        const {data}=await axios.get(`/api/v1/admin/user/${id}`)
        return data
        }
        catch(error){
  return     rejectWithValue(error.response?.data?.message || 'user feching failed')
        }
    })
 //admin update user role
 
export const  updateUserRole =createAsyncThunk('admin/updateUserRole',
    async({userId,role},{rejectWithValue})=>{
        try{
         
        const {data}=await axios.put(`/api/v1/admin/user/${userId}`,{role:role})
        return data
        }
        catch(error){
  return     rejectWithValue(error.response?.data?.message || 'user feching failed')
        }
    })

    // getAllOrders
    export const getAllOrders =createAsyncThunk('admin/getAllOrders',
    async(_,{rejectWithValue})=>{
        try{
         
        const {data}=await axios.get(`/api/v1/admin/orders`)
        return data
        }
        catch(error){
  return     rejectWithValue(error.response?.data?.message || 'user feching failed')
        }
    })

    //delete orders

        // getAllOrders
    export const deleteOrder =createAsyncThunk('admin/deleteOrders',
    async(orderId,{rejectWithValue})=>{
        try{
         
        const {data}=await axios.delete(`/api/v1/admin/order/${orderId}`)
        return data
        }
        catch(error){
  return     rejectWithValue(error.response?.data?.message || 'user feching failed')
        }
    })

    //update Order status
        export const updateOrderStatus =createAsyncThunk('admin/updateOrderStatus',
    async({orderId,status},{rejectWithValue})=>{
        try{
         const config={headers:{'content-type':'application/json'}}
        const {data}=await axios.put(`/api/v1/admin/order/${orderId}`,{orderStatus:status},config)
        return data
        }
        catch(error){
  return     rejectWithValue(error.response?.data?.message || 'user feching failed')
        }
    })

    // fetch admin reviews
       export const fetchAdminReviews =createAsyncThunk('admin/fetchAdminReviews',
    async(id,{rejectWithValue})=>{
        try{
        
        const {data}=await axios.get(`/api/v1/admin/reviews?id=${id}`)
        return data
        }
        catch(error){
  return     rejectWithValue(error.response?.data?.message || 'Reviews fetching failed')
        }
    })

    // admin delete review

   
       export const deleteReview =createAsyncThunk('admin/deleteReview',
    async({productId,reviewId},{rejectWithValue})=>{
        try{
        
        const {data}=await axios.delete(`/api/v1/admin/reviews?productId=${productId}&reviewId=${reviewId}`)
        return data
        }
        catch(error){
  return     rejectWithValue(error.response?.data?.message ||'delete review failed')
        }
    })



const adminSlice=createSlice({
    name:'admin',
    initialState:{
        products:[],
        product:{},
        success:false,
        loading:false,
        error:null,
        users:[],
        user:{},
        deleting:{},
        message:'',
        orders:[],
        order:{},
        reviews:[],
        totalAmount:0
    },
    reducers:{
            removeErrors:(state)=>{
                state.error=null
            }, 
            removeSuccess:(state)=>{
                state.success=false
            },
            removeMessage:(state)=>{
                state.message=null
            }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAdminProducts.pending,(state)=>
        {
            state.error=null,
            state.loading=true
        })
        .addCase(fetchAdminProducts.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false
          state.products=action.payload.products

        })
        .addCase(fetchAdminProducts.rejected,(state,action)=>
        {
            state.loading=false
            state.error=action.payload
        })

        // create product
         builder.addCase( createProduct.pending,(state)=>
        {
            state.error=null,
            state.loading=true
        })
        .addCase( createProduct.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false
            state.success=action.payload.success
          state.products.push(action.payload.product)

        })
        .addCase( createProduct.rejected,(state,action)=>
        {
            state.loading=false
            state.error=action.payload
        })


        //  update product

          builder.addCase( updateProduct.pending,(state)=>
        {
            state.error=null,
            state.loading=true
        })
        .addCase( updateProduct.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false
          state.product=action.payload.product
          state.success=action.payload.success

        })
        .addCase( updateProduct.rejected,(state,action)=>
        {
            state.loading=false
            state.error=action.payload
        })

// deleting product

    builder.addCase( deleteProduct.pending,(state,action)=>
        {
          const productId=action.meta.arg
            state.deleting[productId]=true
        })
        .addCase( deleteProduct.fulfilled,(state,action)=>{
            const productId=action.meta.arg
            state.error=null
            state.deleting[productId]=false
            state.products=state.products.filter(product=>product._id !== productId)
          state.success=action.payload.success
          state.message=action.payload.message

        })
        .addCase( deleteProduct.rejected,(state,action)=>
        {   const productId=action.meta.arg
            state.deleting[productId]=false
            state.error=action.payload
        })

        //fetch All users

          builder.addCase(fetchAllUsers.pending,(state)=>
        {
            state.error=null,
            state.loading=true
        })
        .addCase(fetchAllUsers.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false
          state.users=action.payload.users
        

        })
        .addCase( fetchAllUsers.rejected,(state,action)=>
        {
            state.loading=false
            state.error=action.payload
        })

      //delete user 
      
      
          builder.addCase( deleteUser.pending,(state)=>
        {
            state.error=null,
            state.loading=true
        })
        .addCase( deleteUser.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false
        state.message=action.payload.message

        })
        .addCase( deleteUser.rejected,(state,action)=>
        {
            state.loading=false
            state.error=action.payload
        })
 
        // admin get single user

        
          builder.addCase( getSingleUser.pending,(state)=>
        {
            state.error=null,
            state.loading=true
        })
        .addCase(  getSingleUser.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false
        state.user=action.payload.user
       

        })
        .addCase(  getSingleUser.rejected,(state,action)=>
        {
            state.loading=false
            state.error=action.payload
        })
 
        // user role update
         builder.addCase( updateUserRole.pending,(state)=>
        {
            state.error=null,
            state.loading=true
        })
        .addCase( updateUserRole.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false
        state.success=action.payload.success

        })
        .addCase(   updateUserRole.rejected,(state,action)=>
        {
            state.loading=false
            state.error=action.payload
        })
 
    // fetch all orders

       // user role update
         builder.addCase(getAllOrders.pending,(state)=>
        {
            state.error=null,
            state.loading=true
        })
        .addCase(getAllOrders.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false
        state.orders=action.payload.orders
        state.totalAmount=action.payload.totalAmount

        })
        .addCase(getAllOrders.rejected,(state,action)=>
        {
            state.loading=false
            state.error=action.payload
        })
 
        // delete order
         builder.addCase(deleteOrder.pending,(state)=>
        {
            state.error=null,
            state.loading=true
        })
        .addCase(deleteOrder.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false
        state.message=action.payload.message
        state.success=action.payload.success

        })
        .addCase(deleteOrder.rejected,(state,action)=>
        {
            state.loading=false
            state.error=action.payload
        })

        // update order status 

           builder.addCase(updateOrderStatus.pending,(state)=>
        {
            state.error=null,
            state.loading=true
        })
        .addCase(updateOrderStatus.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false
        state.order=action.payload.order
        state.success=action.payload.success

        })
        .addCase(updateOrderStatus.rejected,(state,action)=>
        {
            state.loading=false
            state.error=action.payload
        })
 
// fetch all product review

           builder.addCase(fetchAdminReviews.pending,(state)=>
        {
            state.error=null,
            state.loading=true
        })
        .addCase(fetchAdminReviews.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false
            state.reviews=action.payload.reviews

        })
        .addCase(fetchAdminReviews.rejected,(state,action)=>
        {
            state.loading=false
            state.error=action.payload
        })
 
    
// delete product review

           builder.addCase(deleteReview.pending,(state)=>
        {
            state.error=null,
            state.loading=true
        })
        .addCase(deleteReview.fulfilled,(state,action)=>{
            state.error=null,
            state.loading=false
            state.success=action.payload.success
            state.message=action.payload.message
        })
        .addCase(deleteReview.rejected,(state,action)=>
        {
            state.loading=false
            state.error=action.payload
        })
    }
})



export const{removeErrors,removeSuccess,removeMessage}=adminSlice.actions
export default adminSlice.reducer