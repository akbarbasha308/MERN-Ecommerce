export const handleAsyncError=(myErrorfun)=>(req,res,next)=>{

    Promise.resolve(myErrorfun(req,res,next)).catch(next)
}