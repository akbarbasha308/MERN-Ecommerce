import React from 'react'
import '../CartStyles/Cart.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
function Cart() {
    const {cartItems} =useSelector(state=>state.cart)
    const subTotal =cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0)
    const tax=subTotal*0.18;
    const shippingCharge=subTotal>500? 0:50
       const total=subTotal+tax+shippingCharge
       const navigate=useNavigate()
       const checkOutHandler=()=>{
        navigate('/login?redirect=/shipping')
       }
       
  return (
    <>
    <PageTitle title='Your Cart' />
    {cartItems.length===0 ? (
        <>
        <Navbar />
        <div className="empty-cart-container">
        <p className='empty-cart-message'>Your cart is empty</p>   
        <Link to='/products' className='viewProducts'>View Products</Link>   
        </div>
        <Footer />
        </>
    ):(
    <>
    <Navbar />
    <div className='cart-page'>
   <div className="cart-items">
   <div className="cart-items-heading">Your Cart</div>
   <div className="cart-table">
    <div className="cart-table-header">
        <div className='header-product'>Product</div>
         <div className='header-quantity'>Quantity</div>
          <div className='header-total item-total-heading'>Item Total</div>
           <div className='header-action'>Actions</div>
    </div>
    {/*Cart item */ }
    {cartItems && cartItems.map(item=><CartItem item={item}  key ={item.product}/>)}
    </div>
    </div>
    {/*price summary*/ }
    <div className="price-summary">
      <h3 className="price-summart-heading">Price Summary</h3>
      <div className="summary-item">
        <p className='summary-label'>Subtotal:</p>
        <p className="summary-value">{subTotal}</p>
        </div>
         <div className="summary-item">
        <p className='summary-label'>Tax(18%):</p>
        <p className="summary-value">{tax}</p>
        </div>
         <div className="summary-item">
        <p className='summary-label'>Shipping:</p>
        <p className="summary-value">{shippingCharge}</p>
        </div>
         <div className="summary-item">
        <p className='summary-label'>Total:</p>
        <p className="summary-value">{total}</p>
        </div>
        
       <button className='checkout-btn' onClick={checkOutHandler}>Proceed To checkout</button>
    </div>
    </div>
    <Footer />
    </>
)}

  </> 
 )}
    
  


export default Cart