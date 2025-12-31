import handleError from "../utility/handleError.js"

export const errorHandleMiddleware=(err,req,res,next)=>
{
    err.statuscode=err.statuscode||500
    err.message=err.message||"internal server error"

if (err.name==='CastError')
    {
const message=`there is an invalid resource :${err.path}`
       err= new handleError(message,404)
       statusCode = 404
    }    
    if(err.code===11000)
{
    console.log(err)
    const message=`this ${Object.keys(err.keyValue)} already register,pls login to continue`
    err=new handleError(message,400)
}
    res.status(err.statuscode).json(
        {status:false,
        message:err.message
    })
}

