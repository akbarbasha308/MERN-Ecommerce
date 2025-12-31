import React, { useState } from 'react'
import '../UserStyles/UserDashboard.css'
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, removeSuccess } from '../features/user/userSlice'
import { toast } from 'react-toastify'
import { removeErrors } from '../features/products/productSlice'
function UserDashboard({user}) {
  const navigate=useNavigate()
  const dispatch=useDispatch()
const {cartItems}=useSelector(state=>state.cart)
   const Orders=()=>{
          navigate('/orders/user')
    }
   
    const Accounts = () =>{
         navigate('/profile')
    }
    const myCart=()=>{
  navigate('/cart')
    }

    const Dashboard =()=>{
         navigate('/admin/dashboard')
    }
    const userLogout=()=>{
     dispatch(logout()).unwrap()
     .then(()=>{
        toast.success('sucessfully logedout',{position:'top-center',autoClose:3000}) 
         navigate('/login')
    dispatch(removeSuccess()) })
    .catch((error)=>{
   toast.error('logout failed',{position:'top=center',autoClose:3000})
   dispatch(removeErrors())
    })
    }
    const options=[{name:'Orders' ,funcName:Orders},
        {name:'Accounts' ,funcName:Accounts},
       {name:`Cart(${cartItems.length})`,funcName:myCart,isCart:true},
     {name:'LogOut',funcName:userLogout},]
   const [menuVisible,setMenuVisible]=useState(false)
   const toggleMenu=()=>{
    setMenuVisible(!menuVisible)
   }
//   if(user.role === 'admin')
//   {
//  options.unshift({name:'AdminDashboard' ,funcName:Dashboard})
//   }
      if(user.role==='admin'){
        options.unshift({
            name:'Admin Dashboard',funcName:Dashboard
        })
    }
  return (
    <>
    <div className={`overlay ${menuVisible?'show':''}`} onClick={toggleMenu}></div>
    <div className='dashboard-container'>
        <div className='profile-header' onClick={toggleMenu} >
            <img className='profile-avatar' src={user.avatar.url?user.avatar.url:'./images/profile.png'} alt='profile/picture' />
        <span className='profile-name'>{user.name}</span>
        </div>
     {menuVisible &&   <div className="menu-options">
            {options.map((item)=>(
                <button key={item.name} className={`menu-option-btn ${item.isCart?(cartItems.length>0? 'cart-not-empty':''):''}`} onClick={item.funcName}>{item.name}</button>
            ))}
        </div>}
    </div>
 </>)
}

export default UserDashboard