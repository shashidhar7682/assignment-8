const invalidPathMiddleware=(req,res,next)=>{
    res.send({message:"Invalid Path"})
}
module.exports=invalidPathMiddleware;