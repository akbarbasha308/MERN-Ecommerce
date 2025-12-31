import React from 'react'
import '../componentStyles/Rating.css'
import { useState } from 'react'

function Rating({value,onRatingChange,disabled}) 
{

   const[hoveredRating,setHoveredRating]=useState(0)
   const[selectedRating,setSelectedRating]=useState(value||0)

   //handle mouse hover

   const handleMouseEnter=(rating)=>
   {
    if(!disabled){
    setHoveredRating(rating)
    }
   }

   //handle mouse leave

   const handleMouseLeave=()=>
   {
    if(!disabled){
    setHoveredRating(0)
    }
   }

   //handle mouse click

   const handleClick=(rating)=>
   {
    if(!disabled){
    setSelectedRating(rating)
    onRatingChange(rating)
    }
   }

   //function to generate star basedon selected rating

   const generateStar=()=>{
    const stars=[]
    for(let i=1;i<=5;i++)
    {
        const isFilled=i<=(selectedRating||hoveredRating)
      
        stars.push(  <span className={`star ${isFilled ? 'filled' : 'empty' }`} key={i}
         onMouseEnter={()=>handleMouseEnter(i)} onMouseLeave={()=>handleMouseLeave()} 
        onClick={()=>handleClick(i)}>★</span>)
    
   }
return stars ;
   }

  return (
    <div>
    <div className='rating'>{generateStar()}</div>
    </div>
  )
}

export default Rating