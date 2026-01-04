import React, { useEffect } from 'react'
import '../CartStyles/PaymentSuccess.css'
import {Link,useSearchParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useDispatch,useSelector } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import { createOrder ,removeErrors,removeSuccess } from '../features/order/orderSlice'
import { toast } from 'react-toastify'

function PaymentSuccess() {
          
  const [searchParams]=useSearchParams()
  const reference=searchParams.get('reference')
  const {cartItems,shippingInfo}=useSelector(state=>state.cart)
  const { loading,success,error}=useSelector(state=>state.order)
  const dispatch =useDispatch()

  useEffect(()=>{

    const createOrderData=async()=>{
       try{
const orderItem = JSON.parse(sessionStorage.getItem('orderItem'))

if(!orderItem) return
const orderData ={
  shippingInfo:{
    address:shippingInfo.address,
    city:shippingInfo.city,
    state:shippingInfo.state,
    country:shippingInfo.country,
    pinCode:shippingInfo.pinCode,
    phoneNumber:shippingInfo.phoneNumber
  },
  orderItems:cartItems.map((item)=>({
    name:item.name,
    price:item.price,
    quantity:item.quantity,
    image:item.image,
    product:item.product
  })),
  paymentInfo:{
   id:reference,
   status:'succeeded'
  },
  itemPrice:orderItem.subTotal,
  taxPrice:orderItem.tax,
  shippingPrice:orderItem.shippingCharge,
  totalPrice:orderItem.total
}
dispatch(createOrder(orderData))
sessionStorage.removeItem('orderItem')
    }
    catch(error){
toast.error(error.message || 'order creation error',{position:'top-center',autoClose:3000})
    }
    }
   createOrderData()

  },[])
  
  useEffect(()=>{
           if(error){
              toast.error(error,{position:'top-center' ,autoClose:3000})
            dispatch(removeErrors())
            }
   
       },[error,dispatch])
    useEffect(()=>{
           if(success){
            toast.success('order placed',{position:'top-center' ,autoClose:3000})
           dispatch(removeSuccess())
            dispatch(clearCart())
           }
       },[success,dispatch])
  return (
    <>{loading ? (<Loader />):( 
    <>
    <PageTitle title='payment Status' />
    <Navbar />
     <div className='payment-success-container'>
      <div className="success-content">
          <div className="success-icon">
        <div className="checkmark"></div>
      </div>
      <h1>Order confirmed!</h1>
    
    <p>your payment was successfull.Reference id <strong>{reference}</strong></p>
    <Link to='/orders/user' className='explore-btn'>View Orders</Link>
      </div>
    
    </div>
    <Footer />
    </>
   )
    }</>
   
  )
}

export default PaymentSuccess