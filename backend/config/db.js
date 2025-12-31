import mongoose from 'mongoose'

export const connectDB=async()=>{
 await   mongoose.connect(process.env.URL_DB)
.then((data)=>console.log(`data base connected on ${data.connection.host}`))
.catch((err)=>console.log(err.message))
}
