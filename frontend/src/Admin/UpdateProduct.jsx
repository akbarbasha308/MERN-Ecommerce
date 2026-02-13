import React,{useEffect,useState} from 'react'
import '../AdminStyles/UpdateProduct.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle.jsx'
import {useSelector,useDispatch } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
import { getProductDetails } from '../features/products/productSlice.js'
import {removeErrors,removeSuccess, updateProduct} from '../features/admin/adminSlice.js'
import {toast} from 'react-toastify'

function UpdateProduct() {
    
        const {success,error,loading}= useSelector(state=>state.admin)
        const dispatch =useDispatch()
        const [name,setName]=useState("")
        const [price,setPrice]=useState(0)
        const [category,setCategory]=useState("")
        const [description,setDescription]=useState("")
        const [stock,setStock] =useState(0)
        const [images,setImages]=useState([])
        const [oldImages,setOldImages]=useState([])
        const [imagePreview,setImagePreview]=useState([])
        const {product}=useSelector(state=>state.product)
        const categories=['laptop','shoes','pants','glass','watch','cookies','pomegranate',
            'socks','bag','mouse','headphone','bucket','bangle','ring','tv','jacket','top']

        const navigate=useNavigate()
        const {productId}=useParams()
         useEffect(()=>{
    dispatch(getProductDetails(productId))
         },[dispatch,productId])

   useEffect(()=>{
    if(product)
   {
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setDescription(product.description)
    setStock(product.stock)
    setOldImages(product.images)
   }     
   },[dispatch,product])

   const handleImageChange=(e)=>{
    const files=Array.from(e.target.files)
    setImages([])
    setImagePreview([])
    files.forEach(file=>{
         const reader =new FileReader()
    reader.readAsDataURL(file)
    reader.onload=()=>{
        if(reader.readyState===2)
        {
            setImages(old=>[...old,reader.result])
            setImagePreview(old=>[...old,reader.result])
        }
  
    }})
   
   }


   const updateProductSubmit=(e)=>{
    e.preventDefault()
    const myForm=new FormData()
    myForm.set('name',name)
    myForm.set('price',price)
    myForm.set('category',category)
    myForm.set('stock',stock)
    myForm.set('description',description)
    if (images.length > 0) {
    images.map(img=>{
        myForm.append('images',img)
    })}
       dispatch(updateProduct({id:productId,FormData:myForm}))
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
        toast.success('product updated successfully',{position:'top-center',autoClose:3000})
        dispatch(removeSuccess())
        navigate('/admin/products')
    }
  },[dispatch,success])

  return (
    <>
       <Navbar />
       <PageTitle title="Update Product" />
       <div className="update-product-wrapper">
         <h1 className="update-product-title">Update Product</h1>
         <form className="update-product-form" encType="multipart/form-data" onSubmit={updateProductSubmit}>
          <label htmlFor='name'>Product Name</label>
           <input
             type="text"
             id='name'
             className="update-product-input"
             placeholder="Enter Product Name"
             required
             name="name"
             value={name}
             onChange={(e) => setName(e.target.value)}
           />
           <label htmlFor='price'>Product price</label>
           <input
             type="number"
             id='price'
             className="update-product-input"
             placeholder="Enter Product Price"
             required
             name="price"
             value={price}
             onChange={(e) => setPrice(e.target.value)}
           />
            <label htmlFor='description'>Product Description</label>
           <textarea
             type="text"
             id='description'
             className="update-product-textarea"
             placeholder="Enter Product Description"
             required
             name="description"
             value={description}
             onChange={(e) => setDescription(e.target.value)}
           />
             <label htmlFor='category'>Product Category</label>
           <select
             className="update-product-select"
             id='category'
             required
             name="category"
             value={category}
             onChange={(e) => setCategory(e.target.value)}
           >
             <option value="">Choose a Category</option>
             {categories.map((item) => (
               <option value={item} key={item}>
                 {item}
               </option>
             ))}
           </select>
           
             <label htmlFor='stock'>Product Stock</label>
           <input
             type="number"
             id='stock'
             className="update-product-input"
             placeholder="Enter Product Stock"
             required
             name="stock"
             value={stock}
             onChange={(e) => setStock(e.target.value)}
           />
            <label >Product Images</label>
           <div className="update-product-file-wrapper">
             <input
               type="file"
               accept="image/*"
               className="update-product-file-input"
               multiple
               name="image"
               onChange={handleImageChange}
             />
           </div>
           <div className="update-product-preview-wrapper">
            { imagePreview.map((img,index)=>(
             <img
             src={img}
             alt="Product Preview"
             className="update-product-preview-image"
             key={index}
           />
            ))}
           </div>
             <div className="update-product-old-images-wrapper">
            { oldImages.map((img,index)=>(
             <img
             src={img.url}
             alt="old image Preview"
             className="update-product-old-image"
             key={index}
           />
            ))}
           </div>
           <button className="update-product-submit-btn">{loading?'updating Product...':'update'}</button>
         </form>
       </div>
 
       <Footer />
     </>
  )
}

export default UpdateProduct