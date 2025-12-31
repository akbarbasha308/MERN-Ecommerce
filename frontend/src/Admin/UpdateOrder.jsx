import React,{useState,useEffect} from 'react'
import '../AdminStyles/UpdateOrder.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getSingleOrderDetails } from '../features/order/orderSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { removeErrors,removeSuccess,updateOrderStatus } from '../features/admin/adminSlice'

function UpdateOrder() {
    const [status,setStatus]=useState('')
    const {orderId}=useParams()
    const dispatch=useDispatch()
    const {order,loading:orderLoading}=useSelector(state=>state.order)
    const {success,error,loading:adminLoading}=useSelector(state=>state.admin)
    const loading= adminLoading ||orderLoading
    useEffect(()=>{
        if(orderId)
        {
     dispatch(getSingleOrderDetails(orderId))
        }
    },[dispatch,orderId])
const {shippingInfo={},orderItems=[],paymentInfo={},totalPrice,orderStatus}=order
const paymentStatus= paymentInfo.status === 'succeeded' ? 'Paid' : 'Not Paid'
const finalOrderStatus= paymentStatus==='Not Paid'?'Cancelled':orderStatus


const handleStatusUpdate=()=>{
      if (status === orderStatus) {
    toast.info("Order already in this status");
    return;
  }
    if(!status)
    {
        toast.error('Select order Status',{position:'top-center',autoClose:3000})
        return
    }
    dispatch(updateOrderStatus({orderId,status}))
}
useEffect(()=>{
    if(success)
    {
        toast.success('Order Status updated successfully' ,{position:'top-center',autoClose:3000})
   dispatch(removeSuccess())
   dispatch(getSingleOrderDetails(orderId))
    }
}
,[dispatch,success,orderId])
useEffect(()=>{
    if(error)
    {
        toast.error(error,{position:'top-center',autoClose:3000})
    dispatch(removeErrors())
    }
}
,[dispatch,error])

  return (
    <>
    <Navbar />
    <PageTitle title='Update Order status'/>
    {loading ? (<Loader/>):(
<>
<div className="order-container">
    <h1 className="order-title">Order-update</h1>
    <div className="order-details">
        <h2>Order Information</h2>
        <p><strong>Order Id:</strong>{orderId}</p>
         <p><strong>Shipping Address:</strong>{shippingInfo.address},{shippingInfo.city},{shippingInfo.state},
         {shippingInfo.country},{shippingInfo.pinCode}</p>
          <p><strong>Phone No:</strong>{shippingInfo.phoneNumber}</p>
           <p><strong>Order Status:</strong>{finalOrderStatus}</p>
            <p><strong>PaymentStatus:</strong>{paymentStatus}</p>
             <p><strong>Total Price:</strong>{totalPrice}</p>
</div>

<div className="order-items">
    <h2>Order Items</h2>
<table className="order-table">
    <thead>
        <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    </thead>
    <tbody>
        {orderItems.map(item=>(
            <tr key={item._id}>
                <td>
                    <img src={item.image} alt={item.name} className='order-item-image'/>
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
            </tr>))}
    </tbody>
</table>
</div>
<div className="order-status">
    <h2>Update status</h2>
    <select value={status} className='status-select' onChange={(e)=>setStatus(e.target.value)}
        disabled={loading || orderStatus === 'Delivered'}>
        <option value="">select status</option>
        <option value="Shipped">Shipped</option>
        <option value="On the way">On the Way</option>
        <option value="Delivered">Delivered</option>
    </select>
    <button className='update-button' onClick={()=>handleStatusUpdate()} 
    disabled={loading || orderStatus==='Delivered'}>Update Status</button>
</div>
</div>
</>
    )}
    <Footer />  
    </>

  )
}

export default UpdateOrder