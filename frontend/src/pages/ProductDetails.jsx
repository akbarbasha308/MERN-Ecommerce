import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { createReview } from '../features/products/productSlice.js'
import Rating from '../components/Rating'
import { useParams } from 'react-router-dom'
import {getProductDetails, removeErrors as removeProductErrors,removeSuccess as removeReviewSuccess  } from '../features/products/productSlice.js'
import { toast } from 'react-toastify'
import Loader from '../components/Loader.jsx'
import Footer from '../components/Footer.jsx'
import '../pageStyles/ProductDetails.css'
import Navbar from '../components/Navbar.jsx'
import {addItemsToCart} from '../features/cart/cartSlice.js'
import { removeErrors as removeCartErrors,removeSuccess as removeCartSuccess } from '../features/cart/cartSlice.js'

function ProductDetails()
 {
    const {loading,error,product,reviewSuccess,reviewLoading }=useSelector(state=>state.product)
     const {loading:cartLoading,error:cartError,success:cartSuccess,message,cartItems }=useSelector(state=>state.cart)
    const [userRating,setUserRating]=useState(0)
    const [comment,setComment]=useState("")
    const [quantity,setQuantity]=useState(1)
    const [selectedImage,setSelectedImage]=useState()
    const handleRatingChange=(newRating)=>{
        setUserRating(newRating)
    }
    const dispatch=useDispatch()
    const{id}=useParams()
    useEffect(()=>{
        if(id)
        {
 dispatch(getProductDetails(id))
        }
        return()=>{
    dispatch(removeProductErrors())
        }
       
    },[dispatch,id])


    const decreaseQuantity=()=>{
        if(quantity <= 1){
            toast.error('quantity cannot lesser than 1',{position:'top-center',autoClose:3000})
            dispatch(removeCartErrors())
             return ;
        }
        setQuantity(qty=>qty-1)
    }
    const increaseQuantity=()=>{
        if(quantity >= product.stock){
            toast.error('quantity cannot be exceed stock',{position:'top-center',autoClose:3000})
            dispatch(removeCartErrors())
                 return ;
        }
        setQuantity(qty=>qty+1)
    }
    const handleReviewSubmit=(e)=>{
        e.preventDefault();
        if(!userRating)
        {
            toast.error('pls select rating',{position:'top-center',autoClose:3000})
            return
        }
        dispatch(createReview({rating:userRating,comment,productId:id}))
        
    }
    useEffect(()=>{
         if(product && product.images && product.images.length>0)
    {
        setSelectedImage(product.images[0].url)
    }
    },[product])
  
    const addToCart=()=>{
        dispatch(addItemsToCart({id,quantity}))
    }
    useEffect(()=>{
      
            if(cartError){
           toast.error(cartError,{position:'top-center' ,autoClose:3000})
        }
        dispatch(removeCartErrors())

    },[cartError,dispatch])
     useEffect(()=>{
        if(cartSuccess){
         toast.success(message,{position:'top-center' ,autoClose:3000})
        dispatch(removeCartSuccess())
     
        }
    },[cartSuccess,dispatch])

       useEffect(()=>{
        if(reviewSuccess){
         toast.success('review submitted successfully',{position:'top-center' ,autoClose:3000})
        setComment('')
        setUserRating()
        dispatch(removeReviewSuccess())
        dispatch(getProductDetails(id))
  }
    },[reviewSuccess,id,dispatch])
   

    if(loading)
{
    return(
        <>
            <Navbar />
            <Loader />
            <Footer />
        </>
    )
}

    if(error || !product)
    {
        return(
            <>
            <PageTitle title="product-details" />
            <Navbar />
            <Footer />
            </>
        )
    }
  return(
  <>
    <PageTitle title={`${product.name} details`} />
    <Navbar />
    <div className="product-details-container">
        <div className="product-detail-container">
            <div className="product-image-container">
                <img src={selectedImage} alt={product.name} className='product-detail-image' />
                {product.images?.length > 1 && (<div className='product-thumbnails'>
                    { product.images?.map((img,index)=>(<img src={img.url} alt={`thumbnail${index+1}`}
                     className = 'thumbnail-image'  onClick={()=>setSelectedImage(img.url)} key={index} />))}
            </div>)}
            </div>
            <div className="product-info">
                <h2>{product.name}</h2>
                <p className='product-description'>{product.description}</p>
                <p className='product-price'>price:{product.price}</p>
                <div className="product-rating">
                    <Rating 
                    value={product.rating} disabled= {true}/>
              
                <span className="productCardSpan">
                    ({product.numOfReviews}{product.numOfReviews===1?'review':'reviews'})
                </span>
                </div>
                <div className='stock-status'>
                    <span className={product.stock > 0 ? 'in-stock'  : 'out-of-stock'} >
             {product.stock>0 ? `in stock (${product.stock}) `: 'out of stock'}
                    </span>
                </div>
  
  {product.stock > 0 && (
    <>
  <div className="quantity-controls">
    <span className='quantity-label'>Quantity:</span>
    <button className='quantity-button' onClick={decreaseQuantity}>-</button>
    <input type='text' value={quantity} className='quantity-value' readOnly />
   <button className='quantity-button' onClick={increaseQuantity}>+</button>
    </div>
    <button className='add-to-cart-btn' onClick={addToCart} disabled={cartLoading} >{cartLoading?`adding to cart`:'Add to cart'}</button>
    </>)}
    <form className='review-form' onSubmit={handleReviewSubmit}>
        <h3>Write a Review </h3>
        <Rating value={userRating || 0} disabled={false} onRatingChange={handleRatingChange}/>
        <textarea placeholder='write your review here..' className='review-input' value={comment} 
        onChange={(e)=>setComment(e.target.value)} required ></textarea>
        <button className='submit-review-btn' disabled={reviewLoading} >
            {reviewLoading ? 'submiting':'submit'}</button>
    </form>
            </div>
        </div>
        <div className="reviews-container">
            <h3>Customer Review</h3>
            {product.reviews && product.reviews.length > 0 ? (<div className='reviews-section'>
                {product.reviews.map((review,index)=>(
                   <div className='review-item' key={index}>
                    <div className="review-header">
                        <Rating value={review.rating} disabled={true} />
                        </div>
                        <p className='review-comment'>{review.comment}</p>
                        <p className='review-name'>{review.name}</p>
                        
                         </div>
                         ))}
        </div>): (<p className='no-reviews'>no review  yet.Be the first review for this product!</p>
    )}
    </div>
    </div>
    
    <Footer />
    </>
  )
}
export default ProductDetails