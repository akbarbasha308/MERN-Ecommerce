import Order from '../model/orderModel.js'
import Product from '../model/productModel.js'
import handleError from '../utility/handleError.js'
import { handleAsyncError } from '../middleware/handleAsyncError.js'

// creating orders
export const createOrder=handleAsyncError(async(req,res,next)=>
{

    const{shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice}=req.body

    const order=await Order.create({shippingInfo,
                              orderItems,
                            paymentInfo,
                            itemPrice,
                            taxPrice,
                            shippingPrice,
                            totalPrice,
                            paidAt:Date.now(),
                            user:req.user._id
                        })
   res.status(201).json({success:true,
    order
   })
  })
  
   //getting single order 
   export const getSingleOrder=handleAsyncError(async(req,res,next)=>{
 
    const order= await Order.findById(req.params.id).populate("user", "name email")
    if(!order)
    {
      return next(new handleError("order not found",404))
    }
    res.status(200).json({success:true,
      order
    })
   })
   
   
//    export const allMyOrders = handleAsyncError(async (req, res, next) => {
//   const orders = await Order.find({ user: req.user._id });
//   if (orders.length === 0) {
//     return next(new handleError("No orders found for this user", 404));
//   }
//   res.status(200).json({ success: true, orders });
// });





 // admin getting All order
  export const getAllOrders = handleAsyncError(async (req, res, next) => {
    const orders = await Order.find().populate("user", "name email");

      const totalAmount = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});


  // update order status
 export const updateOrderStatus=handleAsyncError(async(req,res,next)=>{
  const order=await Order.findById(req.params.id)

    if(!order)
    {
           throw new Error("Order not found")
    }
    if(order.orderStatus==='Delivered')
    {
          throw new Error("Order already delivered");
  
    }
order.orderStatus=req.body.orderStatus
if(order.orderStatus==='Delivered')
{
 order.deliveredAt=Date.now();
await Promise.all(order.orderItems.map(item=> updateQuantity(item.product,item.quantity)))
}
await order.save({ validateBeforeSave:false })
res.status(200).json({success:true,
message:"status updated successfully",
order
})
 })


 // update quantity
 const updateQuantity=async(id,quantity)=>{
const product =await Product.findById(id)
if(!product)
{
 throw new Error("product not found")
}
product.stock=product.stock-quantity
await product.save()
}

//delete order
export const deleteOrder=handleAsyncError(async(req,res,next)=>{
  const order=await Order.findById(req.params.id)
  if(!order)
  {
    return next (new handleError("order not found",404))
  }
  if(order.status.toLowerCase() !== 'delivered' &&  order.status.toLowerCase() !== 'cancelled' )
  {
      return next (new handleError("order not delivered ,order under processing",400))
  }
  await order.deleteOne()
  res.status(200).json({
    success:true,
    message:"order deleted successfully"
  })
})

//single user total orders
export const sampleOrder=handleAsyncError(async(req,res,next)=>{
   const orders=await Order.find({ user: req.user._id })
  if(!orders)
    {
        return next(new handleError("order not found",404)) 
    }
   res.status(200).json({success:true,
    orders
  })
})

export const totalOrders = handleAsyncError(async (req, res, next) => {
    const orders = await Order.find().populate("user", "name email");

    if (orders.length === 0) {
        return next(new handleError("No orders found", 404));
    }

    const totalAmount = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});