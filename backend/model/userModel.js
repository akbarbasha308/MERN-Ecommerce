import mongoose from "mongoose"
import isEmail from "validator/lib/isEmail.js"
import bcrypt from "bcryptjs"
import JWT from 'jsonwebtoken'
import crypto from 'crypto'


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxlength:[25,"enter your name less than 25 chacter"],
        minlength:[3,"enter your more than 3 charactor"]
    },
    email:{
        type:String,
        required:[true,"enter your email"],  
        unique:true,
        validate:[isEmail,"enter valid email"]
    },
    password:{
        type:String,
        required:[true,"enter your password"],
        minlength:[8,"enter password with minimum 8 character"],
        select:false
    },
    avatar:
    {
        public_id:{type:String,
            required:true},
            url:{type:String,
            required:true}
        },
    role:{
            type:String,
            default:"user"
        },
    resetPasswordToken:String,
    resetPasswordExpire:Date
  },{timestamps:true})
  // password hassing
  userSchema.pre("save", async function(next){
    if(!this.isModified("password"))
    {       
        return next();
    }
    this.password=await bcrypt.hash(this.password,10)
  })

  //authendication 

  userSchema.methods.getJWTToken=function()
  {
    return JWT.sign({id:this._id},process.env.JWT_SECRET_KEY,
      
    {expiresIn:process.env.JWT_EXPIRE})
  }

//reset password token
userSchema.methods.generatePasswordResetToken=
function(){
    const resetToken=crypto.randomBytes(20).toString("hex")
    this. resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex')
  this.resetPasswordExpire=Date.now()+30*60*1000
  return resetToken;
}


export default mongoose.model("User",userSchema)