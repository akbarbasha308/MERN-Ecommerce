import React,{useEffect,useState} from 'react'
import '../UserStyles/Form.css'
import Navbar from '../components/Navbar'
import Footer  from '../components/Footer'
import {toast} from 'react-toastify'
import { useDispatch,useSelector } from 'react-redux'
import PageTitle from '../components/PageTitle'
import { useNavigate, useParams } from 'react-router-dom'
import {removeErrors,removeSuccess,resetPassword} from '../features/user/userSlice'


function ResetPassword() {

    const {success,loading,error}=useSelector((state)=>state.user)
        const dispatch=useDispatch()
        const navigate=useNavigate()
        const[password,setPassword]=useState('')
        const[confirmPassword,setConfirmPassword]=useState('')
    
    const {token}=useParams()
    const resetPasswordSubmit=(e)=>{
        e.preventDefault()
         const data ={password,
                   confirmPassword
                      }
               
                dispatch(resetPassword({token,userData:data}))
    }
          useEffect(()=>{
                    if(error)
                    {
                        toast.error(error,{position:'top-center',autoClose:3000})
                        dispatch(removeErrors())
                    }
                    
                },[dispatch,error])
                useEffect(()=>{
                    if(success)
                    {
                        toast.success('password reset successfull',{position:'top-center',autoClose:3000})
                        dispatch(removeSuccess())
                        navigate('/login')
                    }
                } ,[dispatch,success])
  return (
    <>
       <PageTitle title='ResetPassword'/>
       <Navbar />
       <div className='container form-container'>
        <div className='form-content'>
            <form className='form'  onSubmit={resetPasswordSubmit}>
            <h2>Reset Password</h2>
         
            <div className='input-group'>
                <input type='password' name='Password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className='input-group'>
                <input type='password' name='confirmPassword'  placeholder='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} /> 
            </div>
             
            <button className='authBtn'>Reset</button>
            </form>
        </div>
        
       </div>
               <Footer />
    </>
  )
}

export default ResetPassword