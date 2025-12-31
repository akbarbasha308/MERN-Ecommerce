import React, { useEffect, useState } from 'react'
import '../AdminStyles/UpdateRole.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { useNavigate,useParams } from 'react-router-dom'
import {getSingleUser,removeErrors,removeSuccess,updateUserRole} from '../features/admin/adminSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

function UpdateRole() {

const {userId} =useParams()
const {error,success,loading,user}=useSelector(state=>state.admin)
const dispatch=useDispatch()
const navigate=useNavigate()

const [name,setName]=useState()
const [email,setEmail]=useState()
const [role,setRole]=useState()

useEffect(()=>{
    dispatch(getSingleUser(userId))
},[dispatch,userId])

useEffect(()=>{
    if(user)
    {
setName(user.name || '')
setEmail(user.email || '')
setRole(user.role || '')
    }
},[user])

const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(updateUserRole({userId:userId,role:role}))
}
useEffect(()=>{
    if(success)
    {
        toast.success('Role updated successfully' ,{position:'top-center',autoClose:3000})
   dispatch(removeSuccess())
   navigate('/admin/users')
   
    }
}
,[dispatch,success])
useEffect(()=>{
    if(error)
    {
        toast.error('Role updation failed' ,{position:'top-center',autoClose:3000})
    dispatch(removeErrors())
  
    }
}
,[dispatch,error])

  return (
    <>
    <Navbar />
    <PageTitle title='Update UserRole' />
    <div className="page-wrapper">
        <div className="update-user-role-container">
            <h1>Update User Role </h1>
            <form  className="update-user-role-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' id='name' value={name} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="Email" id='Email' name='email' value={email} readOnly />
                </div>
                 <div className="form-group">
                    <label htmlFor="role">Role</label>
                   <select name="role" id="role" value={role} onChange={(e)=>setRole(e.target.value)}>
                    <option value="">select user role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                   </select>
                </div>
                <button className='btn btn-primary'> UpdateUserRole</button>
            </form>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default UpdateRole