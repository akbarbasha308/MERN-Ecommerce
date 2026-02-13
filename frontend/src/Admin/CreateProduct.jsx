import React,{useEffect,useState} from 'react'
import '../AdminStyles/CreateProduct.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle.jsx'
import {useSelector,useDispatch } from 'react-redux'
import {createProduct,removeErrors,removeSuccess} from '../features/admin/adminSlice.js'
import {toast} from 'react-toastify'

function CreateProduct() {

    const {success,error,loading}= useSelector(state=>state.admin)
    const dispatch =useDispatch()
    const [name,setName]=useState("")
    const [price,setPrice]=useState()
    const [category,setCategory]=useState("")
    const [description,setDescription]=useState("")
    const [stock,setStock] =useState()
    const [image,setImage]=useState([])
    const [imagePreview,setImagePreview]=useState([])
    
    const categories=['glass','shirt','mobile','dress','tv','fruits','laptop']

    const createProductSubmit=(e)=>{
          e.preventDefault();
        const myForm= new FormData()
        myForm.set('name',name)
        myForm.set('price',price)
        myForm.set('category',category)
        myForm.set('description',description)
        myForm.set('stock',stock)
        image.forEach(img=>myForm.append('images',img))
   console.log(myForm)
        dispatch(createProduct(myForm))
    }

const createProductImage=(e)=>{

const files=Array.from(e.target.files)
setImage([])
setImagePreview([])

files.forEach(file=>{
const reader =new FileReader()

reader.onload=()=>{
    if(reader.readyState===2)
    {
        setImage(old=>[...old,reader.result])
        setImagePreview(old=>[...old,reader.result])
    }}
    reader.readAsDataURL(file)

})

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
            toast.success('product created successfully',{position:'top-center',autoClose:3000})
           dispatch(removeSuccess())
           setName()
           setPrice()
           setCategory()
           setDescription()
           setStock()
           setImage([])
           setImagePreview([])
        }
    },[dispatch,success])
  return (
    <>
     <Navbar />
     <PageTitle  title='Create Product'/>
     <div className="create-product-container">
        <h1 className="form-title">Create Product</h1>
        <form 
         className="product-form" encType='multipart/form-data' onSubmit={createProductSubmit}>
          <input type="text"
           placeholder='Enter Product Name'
            required
            name='name'
            value={name}
            className="form-input" 
            onChange={(e)=>setName(e.target.value)}/>
              <input type="number"
           placeholder='Enter Product Price'
            required
            name='price'
            value={price}
            className="form-input" 
            onChange={(e)=>setPrice(e.target.value)}/>
                 <input type="text"
           placeholder='Enter Product Description'
            required
            name='description'
            value={description}
            className="form-input" 
            onChange={(e)=>setDescription(e.target.value)}/>
                 <select type="number"
            required
            name='category'
            value={category}
            className="form-input" 
            onChange={(e)=>setCategory(e.target.value)}>
                <option value="">choose product category</option>
                {categories.map(item=>(<option value={item} key={item}>{item}</option>))}

                </select>
                     <input type="number"
           placeholder='Enter Product Stock'
            required
            name='stock'
            value={stock}
            className="form-input" 
            onChange={(e)=>setStock(e.target.value)}/>

             <div className="form-input-container">

                 <input type="file"
                   accept='image/*'
                   multiple
                   name='image'
            className="form-input-file" 
            onChange={createProductImage}/>
             </div>
     <div className="image-preview-container">
        {imagePreview.map((img,index)=>(
            <img src={img} alt='product-preview' className='image-preview' key={index}/>
        ))}
     </div>
     <button className='submit-btn'>{loading?'Creating Product...':'Create'}</button>
        </form>
     </div>
     <Footer />
    </>
 
  )
}

export default CreateProduct