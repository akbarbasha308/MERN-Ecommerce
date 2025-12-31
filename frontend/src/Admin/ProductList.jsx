import React,{useEffect} from 'react'
import '../AdminStyles/ProductsList.css'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { Link } from 'react-router-dom'
import { Delete,Edit } from '@mui/icons-material'
import { useSelector,useDispatch } from 'react-redux'
import { fetchAdminProducts,removeErrors,removeSuccess,deleteProduct,removeMessage } from '../features/admin/adminSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

function ProductList() {
    const {products,error,loading,deleting,message}=useSelector(state=>state.admin)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchAdminProducts())
    },[dispatch])
    useEffect(()=>{
        if(error)
        {
            toast.error(error,{position:'top-center',autoClose:3000})
           dispatch(removeErrors())
        }
    },[dispatch,error])
    if(!products || products.length===0)
    {
        return(
            <div className="product-list-container">
                <h1 className="product-list-title">Admin Products</h1>
                <p className="no-admin-products">No Products Found</p>
            </div>
        )
    }
const handleDeleteProduct=(id)=>{
    const isConformed= window.confirm('Are you sure want to delete this product?')
if(isConformed)
{
 dispatch(deleteProduct(id))
}
   
}
 useEffect(()=>{
        if(message)
        {
            toast.success(message,{position:'top-center',autoClose:3000})
           dispatch(removeMessage())
        }
    },[dispatch,message])

  return (
    <>
    {loading?(<Loader />):( 
        <>
        <Navbar />
        <PageTitle title='All Products'/>
        <div className="product-list-container">
                <h1 className="product-list-title">All Products</h1>
              <table className="product-table">
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        <th>ProductImage</th>
                        <th>Product Name </th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>CreatedAt</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product,index)=>(
                         <tr key={product._id}>
                            <td>{index+1}</td>
                            <td>{<img src={product.images[0].url} alt={product.name} className='admin-product-image'/>}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.rating}</td>
                            <td>{product.category}</td>
                            <td>{product.stock}</td>
                            <td>{new Date(product.createdAt).toLocaleString()}</td>
                            <td>
                                <Link to={`/admin/product/${product._id}`} className='action-icon edit-icon'><Edit/></Link>
                                 <button onClick={()=>handleDeleteProduct(product._id)} disabled={deleting[product._id]} className='action-icon delete-icon'>{deleting[product._id]?<Loader />:<Delete/>}</button>
                                
                            </td>
                         </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Footer/>
        </>)}
        </>
    
  )
}

export default ProductList