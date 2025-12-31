import React from 'react'
import '../componentStyles/NoProducts.css'
function NoProducts({keyword}) {
  return (
    <div className='no-products-content'>
        <div className='no-products-icon'> ⚠️</div>
            <h3 className='no-products-title'>no matching product found</h3>
            <p className='no-products-message'>we could not found any product matching this
               { keyword} keyword</p>
        </div>
    
  )
}

export default NoProducts