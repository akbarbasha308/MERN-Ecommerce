import React from 'react'
import Rating from './Rating.jsx'
import '../componentStyles/Product.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'


function Product({product}) {
    const [rating,setRating]=useState(0)
    const handleRatingchange=(newRating)=>{
        setRating(newRating)
    }
    

  return (
    <Link to={`/product/${product._id}`} className='product_id' > 
    <div className='product-card'>
<img src={product.images[0].url} alt={product.name} className='product-image-card' />
<div className="product-details">
    <h3 className='product-title'>{product.name}</h3>
    <p className='home-price'><strong>price: </strong>{product.price}</p>
    <div className="rating_container">
        <Rating value={product.ratings} onRatingChange={handleRatingchange} disabled={false} />
    </div>
    <span className='productCardSpan'>(
        {product.numOfReviews}
        {product.numOfReviews===1 ? 'review' : 'reviews'})
    </span>
    <button className='add-to-cart'>view details</button>
</div>
    </div>
    
</Link >  )

  }
export default Product