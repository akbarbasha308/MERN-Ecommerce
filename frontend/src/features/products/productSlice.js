
import{ createAsyncThunk, createSlice} from'@reduxjs/toolkit'
import axios from 'axios'


// get product
export const getProduct =createAsyncThunk('product/getProduct',async({keyword,page=1,category},{rejectWithValue})=>
{
    try{
        let Link =`/api/v1/products?page=${page}`
        if(keyword)
            {
Link+=`&keyword=${keyword}`
        }
        if(category)
            {
Link+=`&category=${category}`
        }
        // const link=keyword?`/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}`:
        // `/api/v1/products?page=${page}`
    const {data}  = await axios.get(Link)
    return data
    }
    catch(error){
       return rejectWithValue(error.response?.data?.message || 'An error occurred')
    }    
})

// get product details

export const getProductDetails =createAsyncThunk('product/getProductDetails',async(id,{rejectWithValue})=>
{
    try{
        const link=`/api/v1/product/${id}`
    const {data}  = await axios.get(link)
    return data
    }
    catch(error){
       return rejectWithValue(error.response?.data?.message|| 'An error occurred')
    }    
})

//Submit Review


export const createReview =createAsyncThunk('product/createReview',async({rating,comment,productId},{rejectWithValue})=>
{
    try{

        const config = {
          headers:  {"content-type":"application/json"}
        }
        
    const {data}  = await axios.put('/api/v1/review',{rating,comment,productId},config)
    return data
    }
    catch(error){
       return rejectWithValue(error.response?.data?.message|| 'review submition failed')
    }    
})


const productSlice=createSlice({

    name:'product',
    initialState:{
        loading:false,
        error:null,
        products:[],
        product:{},
        resultPerPage:4,
        totalPage:0,
        productCount:0,
        reviewSuccess:false,
        reviewLoading:false
    },
    reducers:{
        removeErrors:(state)=>{state.error=null},
        removeSuccess:(state)=>{state.reviewSuccess=false}
    },
    
   extraReducers:(builder)=>
    builder.addCase(getProduct.pending,(state)=>{
        state.loading=true
        state.error=null
    })
     .addCase(getProduct.fulfilled,(state,action)=>{
        state.loading=false
        state.error=null
       state.products=action.payload.products
       state.productCount = action.payload.productCount
       state.resultPerPage = action.payload.resultPerPage
       state.totalPage = action.payload.totalPage
    })
    .addCase(getProduct.rejected,(state,action)=>{
        state.loading=false
        state.error= action.payload 
     
    })
    //getproductdeatils
     .addCase(getProductDetails.pending,(state)=>{
        state.loading=true
        state.error=null
})
.addCase(getProductDetails.fulfilled,(state,action)=>
{
    state.loading=false
    state.product=action.payload.product
    state.error=null
}) 
.addCase(getProductDetails.rejected,(state,action)=>{
    state.loading=false
    state.error=action.payload||'something went wrong'

})

//review submition
 .addCase(createReview.pending,(state)=>{
        state.reviewLoading=true
        state.error=null
})
.addCase(createReview.fulfilled,(state,action)=>
{
    state.reviewLoading=false
    state.error=null
    state.reviewSuccess=action.payload.success
}) 
.addCase(createReview.rejected,(state,action)=>{
    state.reviewLoading=false
    state.error=action.payload||'review submition failed'

})

})

export const {removeErrors,removeSuccess}=productSlice.actions

export default productSlice.reducer