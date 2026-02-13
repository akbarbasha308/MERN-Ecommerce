import React, { useEffect,useState } from 'react'
import '../pageStyles/Products.css'
import PageTitle from '../components/PageTitle.jsx'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import { useNavigate, useLocation } from 'react-router-dom'
import { getProduct, removeErrors } from '../features/products/productSlice.js'
import NoProducts from '../components/NoProducts.jsx'
import { toast } from 'react-toastify';
import Product from '../components/Product.jsx'
import Navbar from '../components/Navbar.jsx'
import Pagination from '../components/Pagination.jsx'


function Products() {
   const dispatch=useDispatch()
  const navigate=useNavigate()
    const {products,loading,error,resultPerPage,totalPage}=useSelector((state)=>state.product)
    const location = useLocation()
  const searchParams =new URLSearchParams(location.search)
   const keyword=searchParams.get('keyword')
   const category=searchParams.get('category')
    const urlPage=parseInt(searchParams.get('page')) || 1
    const [currentPage,setCurrentPage]=useState(urlPage)
    const categories=['laptop','mobile','TV','Fruits','glass']

     useEffect(()=>{
        dispatch(getProduct({keyword,page:currentPage,category}))
    },[dispatch,keyword,currentPage,category])
    useEffect(()=>{
      if(error)
      {
        toast.error( error,{position:'top-center',autoClose:3000})
        dispatch(removeErrors())
      }
     },[error,dispatch])
     const handlePageChange=(page)=>{
      if(page != currentPage)
      {
        setCurrentPage(page)
        const newURLParams= new URLSearchParams(location.search) 
        if(page===1){
          newURLParams.delete('page')
        }
        else{
          newURLParams.set('page',page)
        }
        navigate(`?${newURLParams.toString()}`)
      }
     }
     const handleCategory=(category)=>{
      const newURLParams= new URLSearchParams (location.search)
      newURLParams.set('category',category)
      newURLParams.delete('page')
      navigate(`?${newURLParams.toString()}`)
       
     }
  return (
    <>
    <PageTitle title='AllProducts'  />
    <Navbar />
    <div className='products-layout'>
        <div className='filter-section'>
          <h3 className='filter-heading'>CATEGORIES</h3>
              {/*renter filter categaries*/ }
              {categories.map((category)=>{
                return (<li key={category} onClick={()=>handleCategory(category)}>{category}</li>)
              })}
        </div>
        <div className='products-section'>
        {products && products.length > 0 ?( <div className='products-product-container'>
            
            {products.map((product)=>(<Product key={product._id} product={product}/>))}
        </div>):(<NoProducts keyword={keyword} />) }
       
      <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange} />
    </div>
    </div>
    <Footer />
    </>
  )
}

export default Products