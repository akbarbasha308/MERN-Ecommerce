
import { handleAsyncError } from '../middleware/handleAsyncError.js'
import User from '../model/userModel.js'
import handleError from '../utility/handleError.js'
import bcrypt from 'bcryptjs'
import { sendToken } from '../utility/jwtToken.js'
import { sendEmail } from '../utility/sendEmail.js'
import crypto from 'crypto'
import { v2 as cloudinary } from 'cloudinary'
export const userRegister=handleAsyncError(async(req,res,next)=>{
                    const {name,email,password,avatar}=req.body
   const myCLoud = await cloudinary.uploader.upload(avatar,{
                                       folder:'avatars',
                                           width:150,
                                          crop:'scale'
                                           })
                    
const user=await User.create({
                      name,
                      email,
                      password,
                      avatar:     {
                                  public_id: myCLoud.public_id,
                                    url:myCLoud.url
                                  },
                     

                            })
         sendToken(user,201,res)           
                            
         
                        })

//LOGIN USER 

export const loginUser=handleAsyncError(async(req,res,next)=>{
  const {email,password}=req.body;
  const user=await User.findOne({email}).select("+password")
 // 1. Check if user exists
  if(!user)
  {
    return next(new handleError("Invalid email or password",401))
  }
 // 2. Verify password
 const isPasswordMatch= await bcrypt.compare(password,user.password)
 if(!isPasswordMatch)
  {
    return next(new handleError("Invalid email or password",401))
  }
  sendToken(user,200,res)   
})

//logout 

export const logout=handleAsyncError((req,res,next)=>{
res.cookie('token',null,{
  expires: new Date(Date.now()),
  httpOnly:true
})
res.status(200).json({
  success:true,
  message:"user sucessfully logout"
})
})

// reset password mail sending 

export const requestResetPassword=handleAsyncError( 
  async(req,res,next)=>{
    const {email}=req.body
  const user=await User.findOne({email})
  if(!user)
  {
  return next( new handleError("user does not exist",401))
  }
  let resetToken
  try{
   resetToken= user.generatePasswordResetToken()
    await user.save({ validateBeforeSave: false})
  }
  catch(error)
  {
return next(new handleError("could not save reset token",500))
  }
   //const resetPasswordURL=`${req.protocol}://${req.get('host')}/reset/${resetToken}`;
   const resetPasswordURL = `${process.env.FRONTEND_URL}/reset/${resetToken}`;

    const message = `Use the following link to reset your password: ${resetPasswordURL}. \n\n This link will expire in 30 minutes.\n\n If you didn’t request a password reset, please ignore this message.`;
  try{
    await sendEmail({email:user.email,
      subject:'password reset request',
      message
    })
  }
  catch(error)
  {
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined
    await user.save({validateBeforeSave:false})
    return next (new handleError('email cannot be send,pls try agin later',500))
  }
  
  res.status(200).json(
    {success:true,
      message:`reset token succussfully send to ${user.email}`
  
    }
  )
  })

  //reset password

  export const resetPassword=handleAsyncError(async(req,res,next)=>
  {
    
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest('hex');
    const user =await User.findOne({resetPasswordToken:resetPasswordToken,
      resetPasswordExpire:{$gt:Date.now()}})
 if(!user)
 {
  return next(new handleError('reset token time expired ',400))
 }
 const {password,confirmPassword}=req.body
 
 if(password!==confirmPassword)
 {
 return next( new handleError("new password and confirm password does not match"))
 }
 
 user.password=password
 user.resetPasswordToken=undefined
 user.resetPasswordExpire=undefined
  
 await user.save()
  sendToken(user,200,res)
    })

    //userprofile
  export const profile=handleAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
      success:true,
      user
      })
  })
  //update password
 export const updatePassword=handleAsyncError(async(req,res,next)=>
  {
    const{oldPassword,newPassword,confirmPassword}=req.body;
    const user=await User.findById(req.user.id).select('+password')
   const isPasswordMatch= await bcrypt.compare(oldPassword,user.password)
 if(!isPasswordMatch)
  {
    return next(new handleError("Invalid email or password",401))
  }
  if(newPassword!==confirmPassword)
  {
     return next(new handleError("new password and confirm passwod doesnot match",401))
  }
  user.password=newPassword
  await user.save()
    sendToken(user,200,res)
  })

  //updating profile
 export const updatingProfile=handleAsyncError(async(req,res,next)=>{
    const{name,email,avatar}=req.body
    const update={name,email}

    if(avatar && avatar!=='')
    {
      const user = await User.findById(req.user._id)
      const imageId=user.avatar.public_id
      await cloudinary.uploader.destroy(imageId)
      const myCloud =await cloudinary.uploader.upload(avatar,{folder:'avatars',
                                                                 width:150,
                                                                crop:'scale'})
    
           
    update.avatar={public_id:myCloud.public_id,
                    url:myCloud.url
                    }
                  }
    const user= await User.findByIdAndUpdate(req.user.id,update,{new:true, runValidators: true})
    res.status(200).json({
      success:true,
      message:"profile updated successfully",
      user
    })
  })

  //admin section

  //admin getting all users

export const adminGetAllUsers=handleAsyncError(async(req,res,next)=>{
  const users=await User.find()
  res.status(200).json({
    success:true,
    users:users
  })
})

//admin getting single user
export const adminGetSingleUser=handleAsyncError(async(req,res,next)=>{
  const user=await User.findById(req.params.id)
   if(!user)
  {
    return next(new handleError("Invalid email or password",401))
  }
  res.status(200).json({
    success:true,
    user:user
  })
})

//admin changing user role
export const updateUserRole=handleAsyncError(async(req,res,next)=>{
  const {role}=req.body
 const update={role}
  const user=await User.findByIdAndUpdate(req.params.id,update,{new:true,runValidators:true})
  if(!user)
  {
  return next( new handleError("user not found matching this id",400))
  }
  res.status(200).json({success:true,
    message:"user detials updated ",
    user:user
  })
})

export const deleteUser=handleAsyncError(async(req,res,next)=>{
  const user= await User.findById(req.params.id)
  if(!user)
  {
    return next( new handleError("user not available by this id ",400))
  }
  await User.findByIdAndDelete(req.params.id)
  res.status(200).json({success:true,
    message:"user deleted sucessfully"
  })
})
