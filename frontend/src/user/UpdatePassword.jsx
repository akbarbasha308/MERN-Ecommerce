import React,{useEffect,useState} from 'react'
import '../UserStyles/Form.css'
import Navbar from '../components/Navbar'
import Footer  from '../components/Footer'
import {toast} from 'react-toastify'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import {removeErrors,removeSuccess,updatePassword} from '../features/user/userSlice'
import Loader from '../components/Loader'

function UpdatePassword() {
    const {success,loading,error}=useSelector((state)=>state.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const[oldPassword,setOldPassword]=useState('')
     const[newPassword,setNewPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')


const updatePasswordSubmit=(e)=>{
    e.preventDefault()
     const myForm = new FormData()
            myForm.set('oldPassword',oldPassword)
            myForm.set('newPassword',newPassword)
            myForm.set('confirmPassword',confirmPassword)
            dispatch(updatePassword(myForm))
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
                    toast.success('password updated successfully',{position:'top-center',autoClose:3000})
                    dispatch(removeSuccess())
                    navigate('/profile')
                }
            } ,[dispatch,success])
  return (
     <>
    { loading ? (<Loader />) : 
    ( <>
    <PageTitle title='PasswordUpdate'/>
    <Navbar />
    <div className='container update-container'>
     <div className='form-content'>
         <form className='form'  onSubmit={updatePasswordSubmit}>
         <h2>Update Password</h2>
      
         <div className='input-group'>
             <input type='password' name='oldPassword' placeholder='OldPassword' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
         </div>
         <div className='input-group'>
             <input type='password' name='newPassword'  placeholder='NewPassword' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} /> 
         </div>
          <div className='input-group'>
             <input type='password' name='confirmPassword'  placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} /> 
         </div>
         <button className='authBtn'>Update</button>
         </form>
     </div>
     
    </div>
            <Footer />
 </>)}
  </> )
}

export default UpdatePassword