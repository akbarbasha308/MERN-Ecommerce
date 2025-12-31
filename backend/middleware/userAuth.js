import handleError from "../utility/handleError.js";
import { handleAsyncError } from "./handleAsyncError.js";
import JWT from 'jsonwebtoken'
import User from "../model/userModel.js";

export const verifyUserAuth=handleAsyncError(async(req,res,next)=>
{
    const {token}=req.cookies
    if(!token)
    {
        return next(new handleError("authtication is missing pls login to continue",401))
    }
    const decodedData=JWT.verify(token,process.env.JWT_SECRET_KEY)

req.user=await User.findById(decodedData.id)
               next()
})


//authorization

export const roleBasedAccess =(...roles)=>{
     return (req,res,next)=>
    {
        if(!roles.includes(req.user.role))
        {
return next( new handleError("you are not autharaised for this page",403))
}
 next()
    }}


















    