import Product from "../model/productModel.js"
import handleError from "../utility/handleError.js"
import { handleAsyncError } from "../middleware/handleAsyncError.js"
import apifunctionality from "../utility/APIfunctionality.js"
import {v2 as cloudinary} from 'cloudinary'

// create product
export const createProduct=handleAsyncError( async(req,res,next)=>{

       let images=[];
       if(typeof req.body.images === 'string')
       {
        images.push(req.body.images)
       }
       else if(Array.isArray(req.body.images)){
        images=req.body.images
       }
       const imageLinks=[]
       for(let i=0;i < images.length;i++)
       {
        const result = await cloudinary.uploader.upload(images[i],{folder:'products'})
             imageLinks.push({public_id:result.public_id,
                               url:result.secure_url
             })
       }
       req.body.images=imageLinks


  req.body.user=req.user.id
  const newProduct= await Product.create(req.body)
  res.status(201).json(
                     {    success:true,
                         message:"product created sucessfully",
                              product:newProduct
  })

})

// get all product
export const getAllProduct=handleAsyncError(async(req,res,next)=>{
  const resultPerPage=4;
  const apiFeatures=new apifunctionality(Product.find(),req.query).search().filter()
  //geting filtered query
const filteredQuery=apiFeatures.query
const productCount= await filteredQuery.clone().countDocuments()
//pagination
apiFeatures.pagination(resultPerPage)
//calculating total page 
const totalPage =Math.ceil(productCount/resultPerPage)
const page= Number(req.query.page)||1
if(page>totalPage && productCount>0)
{
  return next(new handleError("this page does not exit",404))
}
const products = await apiFeatures.query
if (!products || products.length ===0)
  {
    return next(new handleError("no product found",404) )
 }  


   res.status(200).json({status:true,
   products:products,
   productCount,
  resultPerPage, 
  totalPage})
 })


// update product
export const updateProduct=handleAsyncError(async(req,res,next)=>{
  let product=await Product.findById(req.params.id)
  if(!product)
  {
   return next( new handleError("product not found",404))
  }
  let images=[]
  if(typeof req.body.images === 'string' )
  {
    images.push(req.body.images)
  }
  else if(Array.isArray(req.body.images)){
    images=req.body.images
  }
  if(images.length>0)
  {
    for(let i=0;i<product.images.length;i++)
      {
       await  cloudinary.uploader.destroy(product.images[i].public_id)
      }
   }
   // upload new image
   let imageLinks=[]
for(let i=0; i < images.length; i++)
{
const result= await cloudinary.uploader.upload(images[i],{folder:'products'})
imageLinks.push({public_id: result.public_id,
                     url:result.url
                  })
}
if(imageLinks.length > 0)
{
req.body.images = imageLinks
}
 
  const updatedProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
                                                                         runValidators: true,
                                                                            })

  res.status(200).json({success:true,product:updatedProduct})
})

// delete product
export const deleteProduct=handleAsyncError(async(req,res,next)=>{
  let product=await Product.findByIdAndDelete(req.params.id)
  if(!product)
  {
    return next( new handleError("product not found",404))
  }
  for(let i=0; i<product.images.length; i++)
  {
 await cloudinary.uploader.destroy(product.images[i].public_id)
  }
 
  res.status(200).json({success:true,message:"product deleted sucessfully"})
})



//get single product
export const getSingleProduct=handleAsyncError(async(req,res,next)=>{
  let product=await Product.findById(req.params.id)
  if(!product)
  {
  return next( new handleError("product not found",404))
  }
  res.status(200).json({status:true,product:product})
})

//admin section 
// admin get all products
export const adminProducts=handleAsyncError(async(req,res,next)=>{
    const products=await Product.find()
    res.status(200).json(
      {sucess:true,
        products
      }
    )
})

//Creating and updating reviews
export const reviews=handleAsyncError(async(req,res,next)=>{
 const {rating,comment,productId}=req.body
 const review={  user:req.user._id,
                 name:req.user.name,
                 rating:rating,
                 comment:comment,
 }
 const product=await Product.findById(productId)
if(!product)
{
return  next(new handleError("product not found related to this id",400))
}
const reviewExist=product.reviews.find((review)=>review.user.toString()===req.user._id.toString())
 if(reviewExist)
 {
reviewExist.rating=rating
reviewExist.comment=comment
}
 else{
   product.reviews.push(review)
 }
 //number of review
 product.numOfReviews=product.reviews.length
//average rating
let ratingSum=0;
product.reviews.forEach(review=>{
  ratingSum=ratingSum+review.rating
})
product.rating=product.reviews.length >0 ?(ratingSum/product.reviews.length):0
await product.save({validateBeforeSave:false})
res.status(200).json({success:true,
  message:"product review added",
  product
})
}
)

//getting product review

export const getReviews=handleAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.query.id)
  if(!product)
  {
   return next( new handleError("product not found",400))
  }
  res.status(200).json({success:true,
   reviews:product.reviews
  })
})

 //delete review
export const deleteReview=handleAsyncError(async(req,res,next)=>{
  const product= await Product.findById(req.query.productId)
  if(!product)
  {
   return next( new handleError("product not found",400))
  }
  product.reviews=product.reviews.filter(review=>review._id.toString()!==req.query.reviewId.toString())
  
  let sum=0
  product.reviews.forEach(review=>
    sum=sum+review.rating)
  product.rating=product.reviews.length > 0 ?(sum/product.reviews.length):0
    product.numOfReviews=product.reviews.length
await product.save({validateBeforeSave:false})
res.status(200).json({
  success:true,
  message:"review deleted successfully"
})

})