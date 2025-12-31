import app from './app.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import { v2 as cloudinary } from 'cloudinary';
import Razorpay from 'razorpay';

if(process.env.NODE_ENV!== 'PRODUCTION')
{
dotenv.config({path:'backend/config/config.env'})
}
const port = process.env.PORT ||5000 ;

//handle uncaughtException
process.on("uncaughtException",(err)=>
{
    console.log(`Error:${err.message}`)
    console.log("there is on uncaught exception error")
    process.exit(1)
})

connectDB()

export  const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret:process.env.RAZORPAY_API_SECRET,
  
});




// cloudinary setup 

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const server=app.listen(port,()=>console.log(`server is runing on the PORT ${port} }`))
// handling unhandled rejection error
process.on("unhandledRejection",(err)=>
{
    console.log(`Error:${err.message}`)
    console.log("there is on unhandledRejection error")
   server.close(()=>{process.exit(1)})
})






