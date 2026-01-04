import React from "react";
import'../CartStyles/payment.css'
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar.jsx"; 
import Footer from "../components/Footer";
import CheckOutPath from "./CheckOutPath";
import {Link,useNavigate} from 'react-router-dom'
import axios from'axios'
import { useSelector } from "react-redux";
import {toast} from 'react-toastify'





function Payment() {
    const orderItem=JSON.parse(sessionStorage.getItem('orderItem'))
    const user =useSelector(state=>state.user)
    const shippingInfo=useSelector(state=>state.cart)
    const navigate=useNavigate()

    const completePayment=async(amount)=>{

        try{
             const {data:keyData} = await axios.get('/api/v1/getKey')
             const {key}=keyData
                     
             const {data:orderData}=await axios.post('/api/v1/payment/process',{amount})
             const {order}=orderData
             const options={
                key,
                amount,
                currency:'INR',
                name:'ShopEasy',
                description:'Eccomerce website payment transation',
                order_id:order.id,
                handler: async function(response) {
                    const {data} =await axios.post('/api/v1/paymentVerification',
                        {
                            razorpay_payment_id:response.razorpay_payment_id,
                            razorpay_order_id:response.razorpay_order_id,
                            razorpay_signature:response.razorpay_signature
                        }
                    )
                    if(data.success)
                    {
                        navigate(`/paymentSuccess?reference=${data.reference}`)
                    }
                    else{
                        alert('payment verification failed')
                    }
                       },
             prefill:{
                       name:user.name,
                       email:user.email,
                       contact:shippingInfo.phoneNumber
             },
             theme:{color:'#3399cc'}
            }
          const rzp= new Razorpay(options)
          rzp.open();
        }

        catch(error){
            toast.error(error.message,{position:'top-center',autoClose:3000})
        }
    }

  return (
    <>
    <PageTitle title='Payment processing' />
    <Navbar />
    <CheckOutPath activePath={2} />
    <div className="payment-container">
        <Link to='/order/confirm'className="payment-go-back">Go back</Link>
        <button className="payment-btn" onClick={()=>completePayment(orderItem.total)}>Pay({orderItem.total})/-</button>
    </div>
    <Footer/>
    </>
  )
}

export default Payment