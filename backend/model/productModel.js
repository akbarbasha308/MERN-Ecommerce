import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    name:{type:String,
        required:[true,"enter your product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"enter your product description"]
    },
    price:{
         type:Number,
        required:[true,"enter your product description"] ,
        maxlength:[7,"price length can't exceed more than 7"]
    },
    rating:{type:Number,
        default:0
    },
    images:[{public_id:{type:String,
                      required:true},
             url:{type:String,
                required:true
             }         
    }],
    category:{ type:String,
              required:[true,"enter your product category"]},
    stock:{ type:String,
        required:[true,"enter your product stock"],
        maxlength:[5,"product length can't exceed more than 5"],
        default:1
    },
    numOfReviews:{
         type:Number
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
                     ref:'User' , 
                    required:true },
                    name:{
                        type:String,
                         required:true
                    },
        rating:{
             type:Number,
            required:true  
        },
        comment:{
            type:String,
            required:true
        }
    }],
    createdAt:{
        type:Date,
        default: Date.now
    }
})

export default mongoose.model('Product',productSchema)