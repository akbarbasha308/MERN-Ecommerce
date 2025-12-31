import React,{useEffect,useState} from 'react'
import {toast} from'react-toastify'
import { removeMessage,removeSuccess, removeCartItem,addItemsToCart } from '../features/cart/cartSlice'
import { useDispatch,useSelector } from 'react-redux'

function CartItem({item}) {
    const {loading,error,success,message,cartItems}=useSelector((state)=>state.cart)
const dispatch =useDispatch()
 const [quantity,setQuantity]=useState(item.quantity)

 const decreaseQuantity=()=>{
if(quantity<=1)
{
    toast.error("quantity can't be lessthan one",{position:'top-center',autoClose:3000})
    dispatch(removeErrors())
return
}
setQuantity(qty=>qty-1)
 }
  const increaseQuantity=()=>{
if(quantity>=item.stock)
{
    toast.error("quantity can't be exceed stock",{position:'top-center',autoClose:3000})
    dispatch(removeErrors())
return
}
setQuantity(qty=>qty+1)
 }
const handleUpdate=()=>{
if(loading) return
if(quantity != item.quantity)
{
    dispatch(addItemsToCart({id:item.product,quantity:quantity}))
}
}
  useEffect(()=>{
         if(error){
            toast.error(error,{position:'top-center' ,autoClose:3000})
         }
            
         dispatch(removeMessage())
 
     },[error,dispatch])
  useEffect(()=>{
         if(success){
          toast.success(message,{position:'top-center' ,autoClose:3000})
         dispatch(removeSuccess())
      
         }
     },[success,dispatch,message])
     const handleRemove=()=>{
        if(loading) return;
        dispatch(removeCartItem(item.product))
        toast.success('item removed from the cart successfully',
            {position:'top-center' ,autoClose:3000})

     }

    return (
    <div className='cart-item'>
        <div className="cart-info">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
       <h3 className="item-name">{item.name}</h3>
       <p className="item-quantity">
        <strong>Quantity:</strong>
        {item.quantity}
       </p>
            </div>
        </div>

{/* quantity controls */}
<div className="quantity-controls">
    <button className='quantity-button decrease-btn' disabled={loading} onClick={decreaseQuantity}>-</button>
    <input type='text' value={quantity} className='quantity-input' readOnly min='1' />
   <button className='quantity-button increase-btn' disabled={loading} onClick={increaseQuantity}>+</button>
</div>
<div className="item-total">
    <span className="item-total-price">
        {(item.price*quantity).toFixed(2)}/-
    </span>
</div>
<div className="item-action">
    <button className="update-item-btn" onClick={handleUpdate} 
    disabled={loading || quantity ===item.quantity}>{loading ? 'updating' : 'update'}</button>
    <button className="remove-item-btn" onClick={handleRemove} 
    disabled={loading }>Remove</button>
</div>
    </div>
  )
}

export default CartItem