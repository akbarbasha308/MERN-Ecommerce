import express from 'express'
import productRouter from './routes/productRoutes.js'
import { errorHandleMiddleware } from './middleware/error.js'
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import orderRouter from './routes/orderRoutes.js'
import paymentRouter from  './routes/PaymentRoutes.js'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const _filename=fileURLToPath(import.meta.url)
const _dirname=path.dirname(_filename)
if(process.env.NODE_ENV!== 'PRODUCTION')
{
dotenv.config({path:'./config/config.env'})
}

const app =express()
app.use(express.json())
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/v1',productRouter)
app.use('/api/v1',userRouter)
app.use('/api/v1',orderRouter)
app.use('/api/v1',paymentRouter)
//serve static file
app.use(express.static(path.join(_dirname,'../frontend/dist')))
// app.get("*",(_,res)=>{
//     res.sendFile(path.resolve(_dirname,'../frontend/dist/index.html'))
// })
// app.get("/*", (_, res) => {
//   res.sendFile(path.resolve(_dirname,'../frontend/dist/index.html'))
// })
app.get(/.*/, (_, res) => {
  res.sendFile(path.resolve(_dirname,'../frontend/dist/index.html'))
})


app.use(errorHandleMiddleware)

export default app