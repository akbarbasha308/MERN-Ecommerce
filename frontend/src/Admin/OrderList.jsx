import React,{useEffect} from 'react'
import '../AdminStyles/OrdersList.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import Loader from '../components/Loader'
import { Edit,Delete } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {removeMessage,removeSuccess,removeErrors,deleteOrder,getAllOrders} from '../features/admin/adminSlice'
import { toast } from 'react-toastify'

function OrderList() {
 const {orders,message,error,loading,success}=useSelector(state=>state.admin)
 const dispatch =useDispatch()
 useEffect(()=>{
    dispatch(getAllOrders())
 },[dispatch])
const handleDelete=(id)=>{
const confirm=window.confirm('Are you sure want to delete this order ?')
if(confirm)
{
    dispatch(deleteOrder(id))
}
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
        toast.success(message,{position:'top-center',autoClose:3000})
     dispatch(removeMessage())
     dispatch(removeSuccess())
     dispatch(getAllOrders())
    }
},[dispatch,message,success])

if(orders.length === 0 && !loading)
{
    return(
        <div className="no-order-container">
            <p>No orders found !</p>
        </div>
    )
}
  return (
    <>
     { loading ? (<Loader />):( <>
    <Navbar />
    <PageTitle title='Orderslist'/>
    <div className="ordersList-container">
        <h1 className="ordersList-title">All orders</h1>
        <div className="ordersList-table-container">
 <table className="ordersList-table">
    <thead>
        <tr>
        <th>SlNo</th>
        <th>OrderId</th>
        <th>Status</th>
        <th>Total Price</th>
        <th>Number Of Items</th>
        <th>Actions</th>
        </tr>
      
    </thead>
    <tbody>
        {orders && orders.map((order,index)=>(
             <tr key={order._id}>
                <td>{index+1}</td>
                <td>{order._id}</td>
                <td className={`order-status ${order.orderStatus?.toLowerCase()}`} >{order.orderStatus}</td>
                <td>{order.totalPrice?.toFixed(2)}</td>
                <td>{order.orderItems.length}</td>
                <td>
                    <Link to={`/admin/order/${order._id}`} className='action-icon edit-icon'><Edit /></Link>
                    <button className='action-icon delete-icon' onClick={()=>handleDelete(order._id)} ><Delete /></button>
                </td>
    </tr>
        ))}
   
    </tbody>
 </table>
        </div>


    </div>
    <Footer />
    </>  )}
    </>
  )
}

export default OrderList