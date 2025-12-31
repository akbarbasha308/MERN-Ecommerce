import React, { useEffect } from 'react'
import '../pageStyles/Home.css'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/navbar.jsx'
import ImageSlider from '../components/ImageSlider.jsx'
import Product from '../components/Product.jsx'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {getProduct, removeErrors} from '../features/products/productSlice.js'
import PageTitle from '../components/PageTitle.jsx'
import Loader from '../components/Loader.jsx'
import { toast } from 'react-toastify';

function Home() {
 const {loading,error,products,productCount}=useSelector(state=>state.product)
 const dispatch=useDispatch()
 useEffect(()=>{
  dispatch(getProduct({keyword:''}))
 },[dispatch])
 useEffect(()=>{
  if(error)
  {
    toast.error(error.message,{position:'top-center',autoClose:3000})
    dispatch(removeErrors())
  }
 },[error,dispatch])
  return (
  <>
   {loading?<Loader />:
  (<>
    <PageTitle title="Home" />  
      <Navbar />
    <ImageSlider />
    <div className='home-container'>
    <h2 className='home-heading'>Trending now</h2>
     <div className="home-product-container">
  {products.map((product,index)=>(
    <Product product={product} key={index}/>
  ))
}  
  </div>
     </div>
  <Footer />
    </>
  )}
</>
)
}
export default Home