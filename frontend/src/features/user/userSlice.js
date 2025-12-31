import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


 //registration
export const register=createAsyncThunk('user/register',async(userData,{rejectWithValue})=>
{
    try{
        const config={
        headers:{
            'content-Type':'multipart/form-data'
        }
    }
    const {data}= await axios.post('/api/v1/register',userData,config)
    return data
}
catch(error) {
    return rejectWithValue(error.response?.data|| {message :'registeration failed'})
}
})

//login
export const login=createAsyncThunk('user/login',async({email,password},{rejectWithValue})=>
{
    try{
        const config={
        headers:{
            'content-Type':'application/json'
        }
    }
    const {data}= await axios.post('/api/v1/login',{email,password},config)
    return data
}
catch(error) {
    return rejectWithValue(error.response?.data || {message:'login failed'})
}
})

//loadUser

export const loadUser=createAsyncThunk('user/loadUser',async(_,{rejectWithValue})=>
{
    try{
    const {data}= await axios.get('/api/v1/profile', { withCredentials: true })
    return data
}
catch(error) {
    return rejectWithValue(error.response?.data||{message:' failed to load user'} )
}
})

//logout 
export const logout=createAsyncThunk('user/logout',async(_,{rejectWithValue})=>
{
    try{
    const {data}= await axios.post('/api/v1/logout',{withCredentials:true})
    return data
}
catch(error) {
    return rejectWithValue(error.response?.data || {message:'logout failed'})
}
})

//updateProfile

export const updateProfile=createAsyncThunk('user/updateProfile',async(userData,{rejectWithValue})=>
{
    try{
        const config={
        headers:{
            'content-Type':'multipart/form-data'
        }
    }
    const {data}= await axios.put('/api/v1/profile/update',userData,config)
    return data
}
catch(error) {
    return rejectWithValue(error.response?.data ||{message:'profile update failed'} )
}
})

 // updatePassword
export const updatePassword=createAsyncThunk('user/updatePassword',async(userData,{rejectWithValue})=>
{
    try{
        const config={
        headers:{
            'content-Type':'application/json'
        }
    }
    const {data}= await axios.put('/api/v1/password/update',userData,config)
    return data
}
catch(error) {
    return rejectWithValue(error.response?.data || {message:'password update failed'})
}
})

//forgotPassword
export const forgotPassword=createAsyncThunk('user/forgotPassword',async(userData,{rejectWithValue})=>
{
    try{
        const config={
        headers:{
            'content-Type':'application/json'
        }
    }
    const {data}= await axios.post('/api/v1/reset/forgot',userData,config)
    return data
}
catch(error) {
    return rejectWithValue(error.response?.data || {message:'email sending failed'})
}
})
//resetPassword
export const resetPassword=createAsyncThunk('user/resetPassword',async({token,userData},{rejectWithValue})=>
{
    try{
        const config={
        headers:{
            'content-Type':'application/json'
        }
    }
    const {data}= await axios.post(`/api/v1/reset/${token}`,userData,config)
    return data
}
catch(error) {
    return rejectWithValue(error.response?.data || {message:"Can't reset password ,try again later"})
}
})


const userSlice=createSlice(
    {
        name:'user',
        initialState:{
            user:JSON.parse(localStorage.getItem('user'))||null,
            loading:false,
            error:null,
            success:false,
            isAuthenticated:localStorage.getItem('isAuthenticated')==='true'||null,
            message:null
            },
        reducers:{
            removeErrors:(state)=>{
              state.error=null
            },
            removeSuccess:(state)=>{
            state.success=false
            }

        },
        extraReducers:(builder)=>{
        //registeration
            builder.addCase(register.pending,(state)=>
            {
                state.loading=true;
                state.error=null
            })
            .addCase(register.fulfilled,(state,action)=>{
                state.error=null;
                state.loading=false;
                state.success=action.payload.success;
                state.user=action.payload?.user;
                state.isAuthenticated=Boolean(action.payload.user)
                //local storage
                localStorage.setItem('user',JSON.stringify(state.user))
                localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated))
            })
            .addCase(register.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload?.message || 'registeration failed'
            }
            )
            //login 
            builder.addCase(login.pending,(state)=>
            {
                state.loading=true;
                state.error=null
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.error=null;
                state.loading=false;
                state.success=action.payload.success;
                state.user=action.payload?.user;
                state.isAuthenticated=Boolean(action.payload.user)

                 //local storage
                localStorage.setItem('user',JSON.stringify(state.user))
                localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated))
            })
            .addCase(login.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload?.message || 'login failed'
            }
            )

         // loadUser
          
            builder.addCase(loadUser.pending,(state)=>
            {
                state.loading=true;
                state.error=null
            })
            .addCase(loadUser.fulfilled,(state,action)=>{
                state.error=null;
                state.loading=false;
                state.user=action.payload?.user;
                state.isAuthenticated=Boolean(action.payload.user)

                 //local storage
                localStorage.setItem('user',JSON.stringify(state.user))
                localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated))
            })
            .addCase(loadUser.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload?.message  || 'login failed'
            }
            )   

     // logout

     builder.addCase(logout.pending,(state)=>
            {
                state.loading=true;
                state.error=null
            })
            .addCase(logout.fulfilled,(state,action)=>{
                state.error=null;
                state.loading=false;
                state.user=null
                state.isAuthenticated=false
              
              //  localStorage
              localStorage.removeItem('user')
              localStorage.removeItem('isAuthenticated')
            })
            .addCase(logout.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload?.message   || 'logout failed'
            }
            )  
            
            //profile update 

                builder.addCase(updateProfile.pending,(state)=>
            {
                state.loading=true;
                state.error=null
            })
            .addCase(updateProfile.fulfilled,(state,action)=>{
                state.error=null;
                state.loading=false;
                state.success=action.payload.success;
                state.user=action.payload?.user || null;
                state.message=action.payload?.message
            })
            .addCase(updateProfile.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload?.message  || 'profile updation failed'
            }
            )

            //update password

               builder.addCase(updatePassword.pending,(state)=>
            {
                state.loading=true;
                state.error=null
            })
            .addCase(updatePassword.fulfilled,(state,action)=>{
                state.error=null;
                state.loading=false;
                state.success=action.payload.success;
               
            })
            .addCase(updatePassword.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload?.message  || 'profile updation failed'
            }
            )

            //forgot password
          
               builder.addCase(forgotPassword.pending,(state)=>
            {
                state.loading=true;
                state.error=null
            })
            .addCase(forgotPassword.fulfilled,(state,action)=>{
                state.error=null;
                state.loading=false;
                state.success=action.payload?.success;
                state.message=action.payload?.message
               
            })
            .addCase(forgotPassword.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload?.message  || 'email sending failed'
            }
            )

             //reset password
          
               builder.addCase(resetPassword.pending,(state)=>
            {
                state.loading=true;
                state.error=null
            })
            .addCase(resetPassword.fulfilled,(state,action)=>{
                state.error=null;
                state.loading=false;
                state.success=action.payload?.success;
                state.user=null
                state.isAuthenticated=false
               
            })
            .addCase(resetPassword.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload?.message  || 'email sending failed'
            }
            )


        }

        }    
    
)

export default userSlice.reducer
export const {removeErrors,removeSuccess}=userSlice.actions